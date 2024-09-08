const Task = require('./task'); // Import the Task model
const db = require('../db'); // Import the getDB function


class Application {
    constructor(data) {
        this.university = data.university;
        this.program_name = data.program_name;
        this.fee = data.fee;
        this.deadline = data.deadline;
        this.application_portal_link = data.application_portal_link;
        this.status = data.status;
        this.decision_date = data.decision_date;
        this.mentee_id = data.mentee_id; // Assuming the mentee is linked by ID
        this.application_material = data.application_material;
        this.tasks = data.tasks || [];  // Array of tasks
        this.prerequisite = data.prerequisite;
    }

    // Method to save a new application in the database
    async save() {
        // const db = getDB(); // Get the Supabase client instance
        console.log('Inserting data:', this);
        const { data, error } = await db
            .from('applications')
            .insert([this])
            .select();

        if (error) throw error;
        // Ensure data is not null
    // if (!data || !data.id) {
    //     throw new Error('Failed to create application or missing ID in response.');
    // }
    console.log('Insert Response:', { data, error }); // Log the response and error

        // Save associated tasks if provided
        if (this.tasks.length > 0) {
            for (let taskData of this.tasks) {
                const task = new Task({ ...taskData, application_id: data.id });
                await task.save(db);
            }
        }

        return data;
    }

    // Method to update an existing application in the database
    async update(id) {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('applications')
            .update(this)
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    }

    // Method to fetch an application by ID
    static async getById(id) {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('applications')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;

        // Fetch associated tasks
        const tasks = await Task.getByApplicationId(db, id);
        data.tasks = tasks;

        return data;
    }

    // Method to fetch all applications
    static async getAll() {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('applications')
            .select('*');
        
        if (error) throw error;
        return data;
    }

    // Method to delete an application by ID
    static async deleteById(id) {
        // const db = getDB(); // Get the Supabase client instance
        const { error } = await db
            .from('applications')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
    }

    // Method to fetch applications by mentee ID
    static async getByMenteeId(menteeId) {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('applications')
            .select('*')
            .eq('mentee_id', menteeId);

        if (error) throw error;
        return data;
    }
}

module.exports = Application;


// {
//     "university": "Example University",
//     "program_name": "Master of Science in Computer Science",
//     "fee": 2000,
//     "deadline": "2024-12-15",
//     "application_portal_link": "http://exampleuniversity.com/apply",
//     "status": "Pending",
//     "decision_date": "2025-01-20",
//     "mentee_id": 12345,
//     "application_material": {
//       "essay": {
//         "essay_name": "Personal Statement",
//         "status": "Completed",
//         "word_length": 1200,
//         "is_starred": true,
//         "version": {
//           "type": "text",
//           "text": "This is the complete essay text for the personal statement."
//         }
//       },
//       "sop": {
//         "content": "This is the SOP text content.",
//         "is_pdf": false
//       },
//       "lor": {
//         "url": "https://example.com/lor.pdf",
//         "is_pdf": true
//       },
//       "resume": {
//         "url": "https://example.com/resume.pdf",
//         "is_pdf": true
//       },
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
//     "prerequisite": "Completion of a Bachelor's degree in Computer Science"
//   }
  
