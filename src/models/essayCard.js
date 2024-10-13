const db = require('../db'); // Import the getDB function

// Essay Card model
class EssayCard {
    constructor(data) {
        this.id = data.id;
        this.application_material_id = data.application_material_id;
        this.title = data.title;
        this.essay_prompt = data.essay_prompt;
        this.status = data.status;
        this.word_limit = data.word_limit;
        this.section = data.section;
    }

    // Save a new essay card
    async save() {
        // const db = getDB();
        const { data, error } = await db
            .from('essay_cards')
            .insert([{
                application_material_id: this.application_material_id,
                title: this.title,
                essay_prompt: this.essay_prompt,
                status: this.status,
                word_limit: this.word_limit,
                section: this.section,
            }])
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    // Fetch by application material ID
    static async getByApplicationMaterialId(application_material_id) {
        // const db = getDB();
        const { data, error } = await db
            .from('essay_cards')
            .select('*')
            .eq('application_material_id', application_material_id);
        if (error) throw new Error(error.message);
        return data;
    }

    // Fetch by application material ID
    static async getById(id) {
        // const db = getDB();
        const { data, error } = await db
            .from('essay_cards')
            .select('*')
            .eq('id', id);
        if (error) throw new Error(error.message);
        return data;
    }


    // Update an essay card by ID
    static async update(id, updatedFields) {
        // const db = getDB();
        const { data, error } = await db
            .from('essay_cards')
            .update(updatedFields)
            .eq('id', id)
            .select();
        if (error) throw new Error(error.message);
        return data[0];
    }

    // Delete an essay card by ID
    static async delete(id) {
        // const db = getDB();
        const { data, error } = await db
            .from('essay_cards')
            .delete()
            .eq('id', id);
        if (error) throw new Error(error.message);
        return data;
    }
}

module.exports = EssayCard;