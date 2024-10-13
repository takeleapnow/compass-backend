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
        const { data, error } = await db
            .from('mentees')
            .insert([{
                name: this.name,
                email: this.email,
                phone_number: this.phone_number,
                undergrad_university: this.undergrad_university,
                undergrad_degree: this.undergrad_degree,
                interests: this.interests,
                undergrad_major: this.undergrad_major,
                undergrad_minor: this.undergrad_minor,
                work_experience_years: this.work_experience_years,
                number_of_publications: this.number_of_publications,
                current_location: this.current_location
            }])
            .select(); // Make sure to include `select()` to return the inserted data
        if (error) throw new Error(error.message);
        return data[0]; // Return the first element from the result array (the inserted mentee)
    }

    // Method to update an existing mentee in the database
    async update(id) {
        // const db = getDB(); // Get the Supabase client instance
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
        // const db = getDB(); // Get the Supabase client instance
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
