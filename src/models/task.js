const db = require('../db'); // Import the Supabase instance

class Task {
    constructor(data) {
        this.id = data.id || null; // Task ID
        this.title = data.title || null; // Title of the task
        this.description = data.description || null; // Task description
        this.status = data.status || null; // Status of the task (e.g., "Pending", "Completed")
        this.private = data.private || false; // Whether the task is private
        this.deadline = data.deadline || null; // Task deadline
        this.priority = data.priority || null; // Priority of the task (e.g., "Low", "High")
        this.application_id = data.application_id || null;  // Foreign key to the application table
        this.mentee_id = data.mentee_id || null; // Foreign key to the mentee table
        this.columnId = data.columnId || null;
    }

    // Save a new task to the database
    async save() {
        const { data, error } = await db
            .from('tasks')
            .insert([{
                title: this.title,
                description: this.description,
                status: this.status,
                private: this.private,
                deadline: this.deadline,
                priority: this.priority,
                application_id: this.application_id,
                mentee_id: this.mentee_id,
                columnId: data.columnId,
            }])
            .single();

        if (error) throw error;
        return data;
    }

    // Update an existing task in the database
    async update(id) {
        const { data, error } = await db
            .from('tasks')
            .update({
                title: this.title,
                description: this.description,
                status: this.status,
                private: this.private,
                deadline: this.deadline,
                priority: this.priority,
                application_id: this.application_id,
                mentee_id: this.mentee_id,
                columnId: data.columnId
            })
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    // Fetch all tasks associated with an application
    static async getByApplicationId(applicationId) {
        const { data, error } = await db
            .from('tasks')
            .select('*')
            .eq('application_id', applicationId);

        if (error) throw error;
        return data;
    }

    // Fetch all tasks associated with a mentee
    static async getByMenteeId(menteeId) {
        const { data, error } = await db
            .from('tasks')
            .select('*')
            .eq('mentee_id', menteeId);

        if (error) throw error;
        return data;
    }

    // Fetch a task by its ID
    static async getById(id) {
        const { data, error } = await db
            .from('tasks')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }
}

module.exports = Task;
