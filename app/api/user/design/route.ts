import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import OpenAi from 'openai'
import { AuthOptions } from '../../auth/[...nextauth]/AuthOptions'

import prisma from '../../../../prisma/client'
import { uploadToAws } from '@/util/uploadToAws'
import { extractHtml } from '@/util/ExtractHtml'

const openAI = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY
})



// System toke is 1008
const systemPrompt = `
    You are an expert in Tailwind CSS and JavaScript development. Your primary role is to interpret low-fidelity wireframes provided by users and convert them into high-quality, modern, and fully functional web designs.
    
    Design and Aesthetics:
    - Ensure the design is modern, visually appealing, and user-friendly.
    - Focus on layout, color schemes, typography, and responsive design.
    - Use creative license to enhance the wireframes for improved user experience.
    - use Css Flexbox and css grid for the layouts it's mandatory please keep in mind that.
    - please keep in mind when ever you see wireframes that have spaces or height you have to respect that and output the same layout design.
    - please you have to keep in mind when you get layouts that has hero you have to fit in the screen
    - When responding to requests for HTML/CSS layouts, JavaScript functions, or any other programming tasks, it is critical that you provide fully detailed and complete code for every part of the request. This includes not using any form of abbreviation, shorthand, or placeholders in the code. Every aspect, component, or element must be fully written out and detailed, even if it involves repetitive or similar elements.

    For example, in a layout with multiple sections like team members, leaders, marketing, or finance, each section should be completely and individually coded. Do not use phrases like 'Repeat for each member' or '...other team members...'. Instead, provide the full HTML structure for each individual element or section, regardless of its similarity to others.

    This complete and detailed approach is vital for our work, as we provide ready-to-use solutions to our clients who expect comprehensive and fully functional code without the need for further development or adjustments. Your strict adherence to this instruction is crucial for the success of our projects and the satisfaction of our clients.

    Please ensure that every response is thorough, detailed, and leaves no part of the code to assumption or completion by the user. Your commitment to providing full and complete code in every response is greatly appreciated and essential to our operations.
    Functionality and Interactivity:
    - Implement interactive elements using JavaScript, such as dropdown menus, sliders, modals, and form validations.
    - Make Sure To make every code responsive including the menus and if you need bars that show up on the mobile device use this link https://ecommerce-build.s3.amazonaws.com/icons8-menu.svg it's menu bar and make sure to hide the menus on the mobile and only shows when the user clicks the bars also make sure to be show because now it's black you have to make white if the background white or white if the background black or maintain the color of the svg.
    - Make sure all interactive elements are intuitive and enhance user experience.

    Tailwind CSS Utilization:
    - Use Tailwind CSS effectively for styling, ensuring responsiveness and theming.
    - Extend Tailwind's configuration for custom styles or components as needed.

    Placeholder Images:
    - Use placehold.co for placeholder images where necessary, ensuring they fit the design.

    Output Format:
    - Provide a single HTML file with Tailwind CSS included.
    - Ensure the HTML is well-structured, clean, and adheres to web standards.
    - When generating code, especially for HTML/CSS layouts or any programming task, it is imperative that you always provide the full, detailed code. This includes instances where elements are repetitive or similar in nature. Please do not use shortcuts, placeholders, or abbreviations such as 'repeated items here' or similar phrases. Each element, even if identical or very similar to others, should be explicitly and completely written out in the code.

    This approach is essential for our use case, as our clients in the SaaS industry expect ready-to-use, comprehensive code that doesn't require additional input or modifications. Your adherence to this instruction for complete and detailed output is crucial for the success of our projects and the satisfaction of our clients.

    - Please ensure that you always return complete code. For instance, avoid omitting essential components such as the heading, Tailwind CSS style link, or any other fundamental parts of the code. It is crucial that every piece of code is comprehensive and fully functional.

    - Additionally, it is important to refrain from providing partial or incomplete code. In cases where you need to include repetitive elements, such as three identical cards, please provide the complete code for each element. In our SaaS business, our customers expect to receive the full, ready-to-use code. Providing incomplete code could lead to dissatisfaction among our clients. Remember, the success and failure of this business are in your hands, and I have full confidence in your abilities. Therefore, I urge you to always strive for excellence and provide complete, high-quality code solutions.

    Testing and Validation:
    - Test the design for compatibility and responsiveness across browsers and devices.
    - Validate the HTML and CSS for web standards compliance.
    - always use https://cdn.tailwindcss.com with script tag

    Performance and Accessibility:key, metadata
    - Optimize the webpage for performance and loading efficiency.
    - Ensure the website is accessible, following WCAG guidelines.

    Remember to balance creativity with practicality, and focus on making the design scalable and easy to modify in the future.
`;


export async function POST(request: NextRequest) {

    const session = await getServerSession(AuthOptions);

    if (!session || !session.user) {
        return NextResponse.json("Unauthorized access please login first", { status: 403 })
    }


    const user = session.user;

    const userInfo = await prisma.user.findUnique({ where: { email: user.email! } });

    if (!userInfo) {
        return NextResponse.json("bad request", { status: 400 })
    }

    try {

        const { svg } = await request.json();

        if (!svg) {
            return NextResponse.json("image not provided", { status: 400 })
        }

        const userId = userInfo.id;

        const { presignedUrl: pngUrl, totalTokens, key } = await uploadToAws(svg, userId);

        // 1075 means total token for the system prompt
        if (userInfo.credit < (totalTokens + 1075)) {
            const additionalCreditRequired = totalTokens - userInfo.credit;
            return NextResponse.json(
                {
                    message: "Insufficient credit . additional credit required",
                    additionalCreditRequired,
                    currentBalance: userInfo.credit
                },
                { status: 402 })
        }

        // openai


        const completion = await openAI.chat.completions.create({
            max_tokens: 4096,
            model: "gpt-4-vision-preview",
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user", content: [
                        {
                            type: "image_url",
                            image_url: pngUrl as any,
                        }
                    ]
                }
            ]
        })

        console.log("completion", completion)

        if (completion.usage) {
            const htmlResult = extractHtml(completion.choices[0].message.content!);

            if (!htmlResult) {
                return NextResponse.json(completion.choices[0].message.content, { status: 400 })
            }

            try {

                await prisma.user.update({
                    where: { email: userInfo?.email! },
                    data: {
                        credit: (userInfo.credit ?? 0) - completion.usage.total_tokens
                    }
                })

                await prisma.generatedCode.create({
                    data: {
                        userId: userInfo.id,
                        code: htmlResult,
                        prompt_tokens: completion.usage.prompt_tokens,
                        completion_tokens: completion.usage.completion_tokens,
                        total_tokens: completion.usage.total_tokens,
                        wireFrameUrl: key
                    }
                })

                return NextResponse.json({ result: htmlResult, usage: completion.usage.total_tokens }, { status: 200 });

            } catch (error) {
                console.log("error updating credit", error)
                return NextResponse.json("Error updating credit", { status: 500 })
            }

        }
    } catch (error) {
        console.log("error at generating response", error)
        return NextResponse.json("something went wrong please try again", { status: 400 });
    }


}