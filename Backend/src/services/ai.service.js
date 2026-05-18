const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
// const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description."),

    technicalQuestions : z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, how to structure the answer, etc."),
    })).describe("A list of technical questions that can be asked in the interview, along with the intention behind asking each question and how to answer them.")
    ,
    behavioralQuestions : z.array(z.object({
        question: z.string().describe("The behavioral question can be asked in the interview"),
        intention: z.string().describe("The intention of the interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, how to structure the answer, etc."),
    })).describe("A list of behavioral questions that can be asked in the interview, along with the intention behind asking each question and how to answer them.")
    ,
    skillGaps : z.array(z.object({
        skill: z.string().describe("The skill that the candidate is lacking based on the resume, self-description, and job description"),
        severity: z.enum(["Low", "Medium", "High"]).describe("The severity of the skill gap, indicating how critical it is for the candidate to address this gap in order to be successful in the role."),
    })).describe("A list of skill gaps that the candidate has based on the resume, self-description, and job description, along with the severity of each gap.")
    ,
    preparationPlan : z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus area for that day, such as a specific topic to study, a type of question to practice, or a skill to work on."),
        tasks : z.array(z.string()).describe("A list of specific tasks to complete on that day, such as reading articles, watching videos, solving practice problems, or conducting mock interviews.")
    })).describe("A day-wise preparation plan for the candidate, outlining the main focus area and specific tasks to complete each day in order to prepare for the interview effectively."),
    
})

async function generateInterviewReport({resume, selfDescription, jobDescription}) {

    const prompt = `Generate an interview preparation report for a candidate based on the following information:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}
                    Ensure all the fields in the interviewReportSchema is equipped with sufficient examples`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType:"application/json",
            responseSchema: z.toJSONSchema(interviewReportSchema)
        }
    }) 

    return JSON.parse(response.text);
}

// Inside src/services/ai.service.js
// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         headless: true,
//         args: [
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             '--disable-dev-shm-usage',
//             '--disable-extensions'
//         ]
//         // ❌ REMOVE executablePath completely! 
//         // Leaving it out allows Puppeteer to automatically find the local browser we downloaded in Step 1.
//     });

//     try {
//         const page = await browser.newPage();
//         await page.setContent(htmlContent, { waitUntil: "networkidle0" });

//         const pdfBuffer = await page.pdf({
//             format: "A4",
//             margin: { top: "5mm", bottom: "5mm", left: "5mm", right: "5mm" },
//             printBackground: true
//         });

//         return pdfBuffer;
//     } 
//     catch (error) {
//         console.log(error)
//     } finally {
//         await browser.close();
//     }
// }
async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true, // Must be true in a server environment
        args: [
            "--no-sandbox", 
            "--disable-setuid-sandbox", 
            "--disable-dev-shm-usage", // Prevents memory crashes on Render's 512MB RAM
            "--single-process"         // Keeps resource usage low
        ],
        // If you still get "Chrome not found", explicitly set this path:
        // executablePath: '/usr/bin/google-chrome-stable' 
    });
    try {
        const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "5mm",
            bottom: "5mm",
            left: "5mm",
            right: "5mm"
        }
    })

    return pdfBuffer
    } catch (error) {
        console.log(error)
    }
    finally{
        await browser.close()
    }

}

// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch({
//         headless: true, // Must be true in a server environment
//         args: [
//             "--no-sandbox", 
//             "--disable-setuid-sandbox", 
//             "--disable-dev-shm-usage", // Prevents memory crashes on Render's 512MB RAM
//             "--single-process"         // Keeps resource usage low
//         ],
//         // If you still get "Chrome not found", explicitly set this path:
//         // executablePath: '/usr/bin/google-chrome-stable' 
//     });
//     try {
//         const page = await browser.newPage();
//     await page.setContent(htmlContent, { waitUntil: "networkidle0" })

//     const pdfBuffer = await page.pdf({
//         format: "A4", margin: {
//             top: "5mm",
//             bottom: "5mm",
//             left: "5mm",
//             right: "5mm"
//         }
//     })

//     return pdfBuffer
//     } catch (error) {
//         console.log(error)
//     }
//     finally{
//         await browser.close()
//     }

// }

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumePdfSchema),
        }
    })


    const jsonContent = JSON.parse(response.text)

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }