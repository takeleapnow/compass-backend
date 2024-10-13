const db = require('../db'); // Import the getDB function

// Essay model
class Essay {
    constructor(data) {
        this.id = data.id;
        this.essay_card_id = data.essay_card_id;
        this.essay_name = data.essay_name;
        this.content = data.content;
        this.word_length = data.word_length;
        this.version_type = data.version_type; // plain_text, template, or AI
        this.template_id = data.template_id; // Only if version_type is template
    }

    // Save a new essay
    async save() {
        const { data, error } = await db
            .from('essays')
            .insert([{
                essay_card_id: this.essay_card_id,
                essay_name: this.essay_name,
                content: this.content,
                word_length: this.word_length,
                version_type: this.version_type,
                template_id: this.template_id || null,
            }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    // Update an essay by ID
    static async update(id, updatedFields) {
        const { data, error } = await db
            .from('essays')
            .update(updatedFields)
            .eq('id', id)
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    // Delete an essay by ID
    static async delete(id) {
        const { data, error } = await db
            .from('essays')
            .delete()
            .eq('id', id);
        if (error) throw new Error(error.message);
        return data;
    }

    // // Delete an essay by ID
    // static async deleteByEssayCardId(id) {
    //     const { data, error } = await db
    //         .from('essays')
    //         .delete()
    //         .eq('id', id);
    //     if (error) throw new Error(error.message);
    //     return data;
    // }

    // Get an essay by ID
    static async getById(id) {
        const { data, error } = await db
            .from('essays')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw new Error(error.message);
        return data;
    }

    // Get essays by Essay Card ID
    static async getByEssayCardId(essayCardId) {
        const { data, error } = await db
            .from('essays')
            .select('*')
            .eq('essay_card_id', essayCardId);
        if (error) throw new Error(error.message);
        return data;
    }
}

module.exports = Essay;
