const db = require('../db'); // Import the getDB function

class ApplicationMaterial {
    constructor(data) {
        this.id = data.id || null;
        this.application_id = data.application_id || null;
        this.essay = data.essay || {};
        this.sop = data.sop || {};
        this.lor = data.lor || {};
        this.resume = data.resume || {};
    }

    // Method to save a new application material in the database
    async save() {
        const { data, error } = await db
            .from('application_materials')
            .insert([this])
            .single();

        if (error) throw error;
        return data;
    }

    // Method to update application material
    async update( id) {
        const { data, error } = await db
            .from('application_materials')
            .update(this)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    // Method to fetch by application ID
    static async getByApplicationId(application_id) {
        const { data, error } = await db
            .from('application_materials')
            .select('*')
            .eq('application_id', application_id);

        if (error) throw error;
        return data;
    }
}

module.exports = ApplicationMaterial;


// {
//     "university": "Example University",
//     "program_name": "Master of Science in Computer Science",
//     "fee": 2000,
//     "deadline": "2024-12-15",
//     "application_portal_link": "www.link.com",
//     "status": "Pending",
//     "decision_date": "2025-01-20",
//     "mentee_id": 4567,
//     "application_material": {
//       "essay": {
//         "essay_name": "Personal Statement",
//         "status": "Completed",
//         "word_length": 1200,
//         "is_starred": true,
//         "version": {
//           "type": "text",
//           "tempate_id"
//           "text": "This is the complete essay text for the personal statement."
//         },
//         "templates": [
//           {
//             "template_id": 1,
//             "template_name": "Graduate Personal Statement Template",
//             "template_content": "This is a template for graduate personal statements.",
//             "template_status": "Draft"
//           },
//           {
//             "template_id": 2,
//             "template_name": "Diversity Essay Template",
//             "template_content": "This is a template for diversity essays.",
//             "template_status": "Completed"
//           }
//         ]
//       },
//       "sop": [{
//         "title": "sopTitle"
//         "content": "This is the SOP text content.",
//         "is_starred": true,
//         "is_pdf": false
//       }],
//       "lor": {
//         "url": "https://lor.pdf",
//         "is_pdf": true
//         "version": {
//           "type": "text",
//           "text": "This is the complete lor text for the personal statement."
//         },
//         "templates": [
//           {
//             "template_id": 1,
//             "template_name": "Graduate Personal Statement Template",
//             "template_content": "This is a template for graduate personal statements.",
//             "template_status": "Draft"
//           },
//           {
//             "template_id": 2,
//             "template_name": "Diversity Essay Template",
//             "template_content": "This is a template for diversity essays.",
//             "template_status": "Completed"
//           }
//         ]
//       },
//       "resume": [{
//         "url": "https://example.com/resume.pdf",
//         "is_pdf": true
//       }],
//       "other_pdfs": [
//         {
//           "name": "Additional Document 1",
//           "url": "https://example.com/otherdoc1.pdf"
//         },
//         {
//           "name": "Additional Document 2",
//           "url": "https://example.com/otherdoc2.pdf"
//         }
//       ]
//     },
//     "tasks": [
//       {
//         "title": "Submit Application",
//         "description": "Complete and submit the application on the portal.",
//         "status": "Pending",
//         "private": false,
//         "deadline": "2024-12-10",
//         "priority": "High",
//         "mentee_id": 12345
//       },
//       {
//         "title": "Prepare SOP",
//         "description": "Write and finalize the SOP before submission.",
//         "status": "In Progress",
//         "private": true,
//         "deadline": "2024-12-05",
//         "priority": "Medium",
//         "mentee_id": 12345
//       }
//     ],
//     "prerequisite": ["Completion of a Bachelor's degree in Computer Science"]
//   }
  