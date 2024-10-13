const db = require('../db'); // Import the getDB function

// Application model
class Application {
    constructor(data) {
        this.id = data.id;
        this.university = data.university;
        this.program_name = data.program_name;
        this.fee = data.fee;
        this.deadline = data.deadline;
        this.application_portal_link = data.application_portal_link;
        this.status = data.status;
        this.decision_date = data.decision_date;
        this.mentee_id = data.mentee_id;
        this.prerequisite = data.prerequisite;
    }

    // Save a new application
    async save() {
        // const db = getDB();
        const { data, error } = await db
            .from('applications')
            .insert([{
                id: this.id,
                university: this.university,
                program_name: this.program_name,
                fee: this.fee,
                deadline: this.deadline,
                application_portal_link: this.application_portal_link,
                status: this.status,
                decision_date: this.decision_date,
                mentee_id: this.mentee_id,
                prerequisite: data.prerequisite
            }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    // Fetch an application by ID
    static async getById(id) {
        // const db = getDB();
        const { data, error } = await db
            .from('applications')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

     // Fetch an application by ID
     static async getByMenteeId(mentee_id) {
        // const db = getDB();
        const { data, error } = await db
            .from('applications')
            .select('*')
            .eq('mentee_id', mentee_id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    // Fetch all applications with pagination
    static async getAll({ limit, offset }) {
        // const db = getDB();
        const { data, error } = await db
            .from('applications')
            .select('*')
            .range(offset, offset + limit - 1);
        if (error) throw new Error(error.message);
        return data;
    }

    // Get the total count of applications
    static async getCount() {
        // const db = getDB();
        const { count, error } = await db
            .from('applications')
            .select('*', { count: 'exact', head: true });
        if (error) throw new Error(error.message);
        return count;
    }

    // Update an application by ID
    static async update(id, updatedFields) {
        // const db = getDB();
        const { data, error } = await db
            .from('applications')
            .update(updatedFields)
            .eq('id', id)
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    // Delete an application by ID
    static async delete(id) {
        // const db = getDB();
        const { data, error } = await db
            .from('applications')
            .delete()
            .eq('id', id);
        // if (error) throw new Error(error.message);
        return data;
    }
}

module.exports = Application;