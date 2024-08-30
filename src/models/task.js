const db = require('../db'); // Import the getDB function

class Task {
    constructor(data) {
        this.id = data.id || null;
        this.title = data.title || null;
        this.description = data.description || null;
        this.status = data.status || null;
        this.private = data.private || false;
        this.deadline = data.deadline || null;
        this.priority = data.priority || null;
        this.application_id = data.application_id || null;  // Foreign key
        this.mentee_id = data.mentee_id || null; // Foreign key
    }

    // Method to save a new task in the database
    async save() {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('tasks')
            .insert([this])
            .single();

        if (error) throw error;
        return data;
    }

    // Method to update an existing task in the database
    async update(id) {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('tasks')
            .update(this)
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    // Method to fetch tasks by application ID
    static async getByApplicationId(applicationId) {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('tasks')
            .select('*')
            .eq('application_id', applicationId);

        if (error) throw error;
        return data;
    }

    // Method to fetch tasks by mentee ID
    static async getByMenteeId(menteeId) {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('tasks')
            .select('*')
            .eq('mentee_id', menteeId);

        if (error) throw error;
        return data;
    }

     // Method to fetch a task by ID
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
