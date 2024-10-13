const db = require('../db'); // Import the getDB function

class Template {
    constructor(data) {
        this.template_id = data.template_id || null;
        this.template_object = data.template_object;  // JSON object for template
    }

    static async getById(db, template_id) {
        const { data, error } = await db
            .from('templates')
            .select('*')
            .eq('template_id', template_id)
            .single();
        
        if (error) throw error;
        return data;
    }

    async save(db) {
        const { data, error } = await db
            .from('templates')
            .insert([this])
            .single();
        
        if (error) throw error;
        return data;
    }

    async update(db, template_id) {
        const { data, error } = await db
            .from('templates')
            .update(this)
            .eq('template_id', template_id)
            .single();

        if (error) throw error;
        return data;
    }

    static async deleteById(db, template_id) {
        const { error } = await db
            .from('templates')
            .delete()
            .eq('template_id', template_id);
        
        if (error) throw error;
    }
}

module.exports = Template;