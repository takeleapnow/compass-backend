const generativeModel = require("../generativeModel");
const { letterOfRecommendationGenerate, letterOfRecommendationEvaluate, essayGenerate, essayStructureGenerate, essayEvaluate } = require("./editorController");

jest.mock('@google/generative-ai', () => ({
    GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
        getGenerativeModel: jest.fn().mockReturnValue({
            generateContent: jest.fn().mockReturnThis(),
        }),
    })),
}));

describe('letterOfRecommendatonGenerate', () => {
    beforeEach(() => {
        req = {
            body: {
                "student_name": "Abhishek Kumar",
                "applied_program": "Masters of Science in Computer Science in Cambridge",
                "recommender": "Manu Basavaraju, professor of Computer Science in NITK",
                "key_strengths": "Problem solving skills, discipline and enthusiasm for learning",
                "success_reasons": "Dedication, persistence",
                "examples": "published a paper in second year of college, graduated with 3.4 CGPA"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 200', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{"text": "<letter>"}'; } }
        });

        await letterOfRecommendationGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'text': '<letter>' });
    });

    it('should return error', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{"error": "Inappropriate text detected"}'; } }
        });

        await letterOfRecommendationGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Inappropriate text detected' });
    });

    it('should handle invalid json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return 'invalid'; } }
        });

        await letterOfRecommendationGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Unable to parse json response' });
    });
});

describe('letterOfRecommendationEvaluate', () => {
    beforeEach(() => {
        req = {
            body: {
                "content": "<letter>"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 200', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{"text": "<letter>"}'; } }
        });

        await letterOfRecommendationEvaluate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'text': '<letter>' });
    });

    it('should handle invalid json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return 'invalid'; } }
        });

        await letterOfRecommendationEvaluate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Unable to parse json response' });
    });
});

describe('essayStructureGenerate', () => {
    beforeEach(() => {
        req = {
            body: {
                "essay_prompt": "<prompt>"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 200', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{}'; } }
        });

        await essayStructureGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    it('should return error', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{"error": "Inappropriate text detected"}'; } }
        });

        await essayStructureGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Inappropriate text detected' });
    });

    it('should handle invalid json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return 'invalid'; } }
        });

        await essayStructureGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Unable to parse json response' });
    });
});

describe('essayGenerate', () => {
    beforeEach(() => {
        req = {
            body: {
                "structure": "<structure>"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 200', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{}'; } }
        });

        await essayGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    it('should return error', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{"error": "Inappropriate text detected"}'; } }
        });

        await essayGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Inappropriate text detected' });
    });

    it('should handle invalid json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return 'invalid'; } }
        });

        await essayGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Unable to parse json response' });
    });

    it('should handle delimited json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '```json{ "text": "<essay>"}```'; } }
        });

        await essayGenerate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'text': '<essay>' });
    });
});

describe('essayEvaluate', () => {
    beforeEach(() => {
        req = {
            body: {
                "text": "<essay>"
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return 200', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '{}'; } }
        });

        await essayEvaluate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({});
    });

    it('should handle invalid json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return 'invalid'; } }
        });

        await essayEvaluate(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'error': 'Unable to parse json response' });
    });

    it('should handle delimited json', async () => {
        generativeModel.generateContent.mockResolvedValue({
            response: { text: function () { return '```json{ "text": "<essay>"}```'; } }
        });

        await essayEvaluate(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 'text': '<essay>' });
    });
});