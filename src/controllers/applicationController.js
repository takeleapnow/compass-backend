// const Application = require('../models/Application');
// const ApplicationMaterial = require('../models/applicationMaterial');
// const EssayCard = require('../models/essayCard');
// const Essay = require('../models/essay');
// const Template = require('../models/template');
// const Task = require('../models/task'); // Import the Task model

// // Create a new application
// async function createApplication(req, res) {
//     try {
//         const applicationData = new Application(req.body);
//         const newApplication = await applicationData.save();

//         if (req.body.application_materials) {
//             const materialData = req.body.application_materials;
//             const newMaterial = new ApplicationMaterial({ ...materialData, application_id: newApplication.id });
//             await newMaterial.save();

//             if (materialData.essay_cards) {
//                 for (const essayCard of materialData.essay_cards) {
//                     const newEssayCard = new EssayCard({ ...essayCard, application_material_id: newMaterial.id });
//                     await newEssayCard.save();

//                     if (essayCard.essays) {
//                         for (const essay of essayCard.essays) {
//                             const newEssay = new Essay({ ...essay, essay_card_id: newEssayCard.id });
//                             await newEssay.save();
//                         }
//                     }
//                 }
//             }
//         }

//         res.status(201).json(newApplication);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }


// // Get an application by ID
// async function getApplicationById(req, res) {
//     try {
//         const { id } = req.params;
//         const application = await Application.getById(id);

//         if (!application) {
//             return res.status(404).json({ error: 'Application not found' });
//         }

//         const applicationMaterials = await ApplicationMaterial.getByApplicationId(id);
//         application.application_materials = applicationMaterials;

//         res.status(200).json(application);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Update an existing application
// async function updateApplication(req, res) {
//     try {
//         const { id, applicationData } = req.body;
//         const updatedApplication = await Application.update(id, applicationData);

//         if (req.body.application_materials) {
//             const materialData = req.body.application_materials;
//             await ApplicationMaterial.update(materialData.id, materialData);

//             if (materialData.essay_cards) {
//                 for (const essayCard of materialData.essay_cards) {
//                     await EssayCard.update(essayCard.id, essayCard);

//                     if (essayCard.essays) {
//                         for (const essay of essayCard.essays) {
//                             await Essay.update(essay.id, essay);
//                         }
//                     }
//                 }
//             }
//         }

//         res.status(200).json(updatedApplication);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Delete an application by ID
// async function deleteApplication(req, res) {
//     try {
//         const { id } = req.params;

//         const applicationMaterials = await ApplicationMaterial.getByApplicationId(id);
//         if (applicationMaterials) {
//             for (const material of applicationMaterials) {
//                 const essayCards = await EssayCard.getByApplicationMaterialId(material.id);
//                 if (essayCards) {
//                     for (const card of essayCards) {
//                         await Essay.deleteByEssayCardId(card.id);
//                         await EssayCard.delete(card.id);
//                     }
//                 }
//                 await ApplicationMaterial.delete(material.id);
//             }
//         }

//         const deletedApplication = await Application.delete(id);
//         if (!deletedApplication) {
//             return res.status(404).json({ error: 'Application not found' });
//         }

//         res.status(200).json({ message: 'Application deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// // Fetch all applications with pagination support
// async function getAllApplications(req, res) {
//     try {
//         const { page = 1, limit = 10 } = req.query;
//         const offset = (page - 1) * limit;

//         const applications = await Application.getAll({ limit, offset });
//         const totalApplications = await Application.getCount(); // Total number of applications
//         const totalPages = Math.ceil(totalApplications / limit);

//         res.status(200).json({
//             data: applications,
//             meta: {
//                 total: totalApplications,
//                 page,
//                 limit,
//                 totalPages,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// async function getApplicationsByMentee(req, res) {
//     try {
//         const { menteeId } = req.body;
//         const applications = await Application.getByMenteeId(menteeId);

//         res.status(200).json(applications);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// module.exports = {
//     createApplication,
//     getApplicationById,
//     updateApplication,
//     deleteApplication,
//     getAllApplications,
//     getApplicationsByMentee
// };



const Application = require('../models/Application');
const ApplicationMaterial = require('../models/applicationMaterial');
const EssayCard = require('../models/essayCard');
const Essay = require('../models/essay');
const Template = require('../models/template');
const Task = require('../models/task'); // Import the Task model

// Create a new application
async function createApplication(req, res) {
    try {
        const applicationData = new Application(req.body);
        const newApplication = await applicationData.save();

        console.log(newApplication)
        // Handle associated tasks
        if (req.body.tasks && Array.isArray(req.body.tasks)) {
            for (const taskData of req.body.tasks) {
                const task = new Task({
                    ...taskData,
                    application_id: newApplication.id,
                });
                await task.save(); // Save each task to the database
            }
        }

        // Handle application materials
        if (req.body.application_materials) {
            const materialData = req.body.application_materials;
            // Ensure application_material is created first, and then its ID is used for essay cards.
            // const newMaterial = new ApplicationMaterial({ ...materialData, application_id: newApplication.id });
            // const savedMaterial = await newMaterial.save(); // Save the material first

            // if (materialData.essay_cards) {
            //     for (const essayCard of materialData.essay_cards) {
            //         // Pass the correct application_material_id to the essay cards
            //         const newEssayCard = new EssayCard({ ...essayCard, application_material_id: savedMaterial.id });
            //         await newEssayCard.save(); // Now save the essay card with the correct application_material_id
            //     }
            // }
            const newMaterial = new ApplicationMaterial({ ...materialData, application_id: newApplication.id });
            const savedMaterial = await newMaterial.save();

            if (materialData.essay_cards) {
                for (const essayCard of materialData.essay_cards) {
                    const newEssayCard = new EssayCard({ ...essayCard, application_material_id: savedMaterial.id });
                    const savedEssayCard = await newEssayCard.save();

                    if (essayCard.essays) {
                        for (const essay of essayCard.essays) {
                            const newEssay = new Essay({ ...essay, essay_card_id: savedEssayCard.id });
                            await newEssay.save();
                        }
                    }
                }
            }
        }

        res.status(201).json(newApplication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing application
async function updateApplication(req, res) {
    try {
        const { id, applicationData } = req.body;
        const updatedApplication = await Application.update(id, applicationData);

        // Handle associated tasks
        if (req.body.tasks && Array.isArray(req.body.tasks)) {
            for (const taskData of req.body.tasks) {
                // If the task has an ID, update it. Otherwise, create a new task
                if (taskData.id) {
                    await Task.update(taskData.id, taskData);
                } else {
                    const task = new Task({
                        ...taskData,
                        application_id: id, // Ensure the task is linked to the application
                    });
                    await task.save();
                }
            }
        }

        // Handle application materials
        if (req.body.application_materials) {
            const materialData = req.body.application_materials;
            await ApplicationMaterial.update(materialData.id, materialData);

            if (materialData.essay_cards) {
                for (const essayCard of materialData.essay_cards) {
                    await EssayCard.update(essayCard.id, essayCard);

                    if (essayCard.essays) {
                        for (const essay of essayCard.essays) {
                            await Essay.update(essay.id, essay);
                        }
                    }
                }
            }
        }

        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get an application by ID
async function getApplicationById(req, res) {
    try {
        const { id } = req.params;
        const application = await Application.getById(id);

        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }

        const applicationMaterials = await ApplicationMaterial.getByApplicationId(id);
        application.application_materials = applicationMaterials;

        // Fetch associated tasks
        const tasks = await Task.getByApplicationId(id);
        application.tasks = tasks;

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an application by ID
async function deleteApplication(req, res) {
    try {
        const { id } = req.params;

        const applicationMaterials = await ApplicationMaterial.getByApplicationId(id);
        // if (applicationMaterials) {
        //     for (const material of applicationMaterials) {
        //         // const essayCards = await EssayCard.getByApplicationMaterialId(material.id);
        //         // if (essayCards) {
        //         //     for (const card of essayCards) {
        //         //         // await Essay.deleteByEssayCardId(card.id);
        //         //         await EssayCard.delete(card.id);
        //         //     }
        //         // }
        //         await ApplicationMaterial.delete(material.id);
        //     }
        // }

        // Delete associated tasks
        // const tasks = await Task.getByApplicationId(id);
        // for (const task of tasks) {
        //     await Task.delete(task.id);
        // }

        const deletedApplication = await Application.delete(id);
        // if (!deletedApplication) {
        //     return res.status(404).json({ error: 'Application not found' });
        // }

        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fetch all applications with pagination support
async function getAllApplications(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const applications = await Application.getAll({ limit, offset });
        const totalApplications = await Application.getCount(); // Total number of applications
        const totalPages = Math.ceil(totalApplications / limit);

        res.status(200).json({
            data: applications,
            meta: {
                total: totalApplications,
                page,
                limit,
                totalPages,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Fetch applications by mentee ID
async function getApplicationsByMentee(req, res) {
    try {
        const { menteeId } = req.body;
        const applications = await Application.getByMenteeId(menteeId);

        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createApplication,
    getApplicationById,
    updateApplication,
    deleteApplication,
    getAllApplications,
    getApplicationsByMentee
};
