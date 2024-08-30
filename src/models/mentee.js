const db = require('../db'); // Import the getDB function

class Mentee {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.phone_number = data.phone_number;
        this.undergrad_university = data.undergrad_university;
        this.undergrad_degree = data.undergrad_degree;
        this.interests = data.interests;
        this.undergrad_major = data.undergrad_major;
        this.undergrad_minor = data.undergrad_minor;
        this.work_experience_years = data.work_experience_years;
        this.number_of_publications = data.number_of_publications;
        this.current_location = data.current_location;
    }

    // Method to save a new mentee in the database
    async save() {
        // const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('mentees')
            .insert([this])
            .single();
        
        if (error) throw error;
        return data;
    }

    // Method to update an existing mentee in the database
    async update(id) {
        const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('mentees')
            .update(this)
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    }

    // Method to fetch a mentee by ID
    static async getById(id) {
        const db = getDB(); // Get the Supabase client instance
        const { data, error } = await db
            .from('mentees')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    }
}

module.exports = Mentee;
