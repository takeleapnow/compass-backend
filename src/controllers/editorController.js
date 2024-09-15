const generativeModel = require('../generativeModel');

function maybeJsonParse(text) {
    try {
        response = JSON.parse(text);

        return response;
    } catch (error) {
        // Assume that the json object is written as
        // ```json
        // <object>
        // ```
        textLength = text.length;
        sanitizedString = text.substring(7, textLength - 3);

        return JSON.parse(sanitizedString);
    }
}

function buildLetterofRecommendationPrompt(context) {
    return `
You are ${context['recommender']} writing a letter of recommendation.

The letter of recommendation follows the structure:
- Salution
- A brief paragraph recommending the student for the program.
- Why you believe the student will be successful.
- The relation with the candidate, how long you have known them, what is your job title
- Any other specified skills or ancedotes.
- Summary

You can use the following information for context:
- Student's name: ${context['student_name']}
- Program: ${context['applied_program']}
- Key strengths: ${context['key_strengths']}
- Reasons for success: ${context['success_reasons']}
- Examples: ${context['examples']}

Return the response as a json without delimiters:  {"text": "..."}. 

In case any of the information is inappropriate or not relevant to academics, return {'error': 'Inappropriate text detected'}.`;
}

async function letterOfRecommendationGenerate(req, res) {
    prompt = buildLetterofRecommendationPrompt(req.body);

    const result = await generativeModel.generateContent(prompt);

    try {
        response = JSON.parse(result.response.text());
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 'error': 'Unable to parse json response' });
    }
}

function buildLetterofRecommendationEvalutionPrompt(context) {
    return `
Can you review the following document and suggest improvements?

"""
${context['text']}
"""

Return the suggestions as json without delimiters in the following format:
[
  {
    "original_value": "<original statement>",
    "proposed_value": "<proposed statement>",
    "explanation": "<explanation for the suggestion>"
  }
]`;
}

async function letterOfRecommendationEvaluate(req, res) {
    prompt = buildLetterofRecommendationEvalutionPrompt(req.body);

    const result = await generativeModel.generateContent(prompt);

    try {
        response = JSON.parse(result.response.text());

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 'error': 'Unable to parse json response' });
    }
}

function buildEssayStructurePrompt(context) {
    return `
The essay prompt is:

"""
${context['essay_prompt']}
"""

Can you help me with the structure of an example essay?

Return the output as a json object without delimiter with the following format:
[
    {
        "<paragraph title>":  {
            "description": "<description of the paragraph">,
            "user_input_values": ["<information required from user to write this paragraph"],
        }
    }
]

In case any of the information is inappropriate, return {'error': 'Inappropriate text detected'}.`;
}

async function essayStructureGenerate(req, res) {
    prompt = buildEssayStructurePrompt(req.body);

    const result = await generativeModel.generateContent(prompt);

    try {
        response = JSON.parse(result.response.text());

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 'error': 'Unable to parse json response' });
    }
}

function buildEssayGeneratePrompt(context) {
    return `
I am writing an essay. I am providing the structure of essay using json value in the following format:

"""
{
    {
      "<section title>":  {
        "description": "<description of the section">,
        "user_input_values": {"<information required to write this section>"},
      }
    }
}
"""

The structure:

"""
${JSON.stringify(context['structure'])}
"""

Return the essay as a json without delimiters:  {"text": "..."}. Seperate each section with a newline.

In case any of the information is inappropriate, return {'error': 'Inappropriate text detected'}.`;
}

async function essayGenerate(req, res) {
    prompt = buildEssayGeneratePrompt(req.body);

    const result = await generativeModel.generateContent(prompt);

    try {
        response = maybeJsonParse(result.response.text());

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 'error': 'Unable to parse json response' });
    }
}

function buildEssayEvaluatePrompt(context) {
    return `
    Can you review the following document and suggest improvements?

    """
    ${context['text']}
    """

    Return the suggestions as json without delimiters in the following format:
    {
        "suggestions": {
            "original_value": "<original statement>",
            "proposed_value": "<proposed statement>",
            "explanation": "<explanation for the suggestion>"
        }
    }`;
}

async function essayEvaluate(req, res) {
    prompt = buildEssayEvaluatePrompt(req.body);

    const result = await generativeModel.generateContent(prompt);

    try {
        response = maybeJsonParse(result.response.text());

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ 'error': 'Unable to parse json response' });
    }
}

module.exports = {
    essayEvaluate,
    essayGenerate,
    essayStructureGenerate,
    letterOfRecommendationGenerate,
    letterOfRecommendationEvaluate
};