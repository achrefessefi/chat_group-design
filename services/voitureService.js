var db = require('../database/database');
/* GET users listing. */
async function findAll(req, res, next) {
  try {
    const { Voiture } = await db();
    const Voitures = await Voiture.findAll();
    res.render('voiture.twig', { title: 'My voiture', Voitures: Voitures });
  } catch (e) {
    console.log(e);
    res.status(500).send('Internal Server Error');
  }
}

async function createVoiture(req, res, next) {
  const { Voiture } = await db();
  const { matricule,marque,modele } = req.body;
  await Voiture.create({matricule,marque,modele});
  res.redirect('/voitures');
  }

async function displayUpdatevoiture (req, res, next){
    try {
      const { Voiture } = await db();
      // Assuming you send the updated Voiture data in the request body
      const { id } = req.params;
      // Find the Voiture by ID
      const VoitureToUpdate = await Voiture.findByPk(id);
      // Check if the Voiture exists
      if (!VoitureToUpdate) {
        return res.status(404).json({ error: 'Voiture not found' });
      }
      res.render('voitureupdate.twig', { title: 'Update voiture', Voiture: VoitureToUpdate });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
 async function updateVoiture(req, res){
  try {
    const { Voiture } = await db();

    // Assuming you send the updated Voiture data in the request body
    const { matricule,marque,modele } = req.body;
    const { id } = req.params;

    // Find the Voiture by ID
    const VoitureToUpdate = await Voiture.findByPk(id);

    // Check if the Voiture exists
    if (!VoitureToUpdate) {
      return res.status(404).json({ error: 'Voiture not found' });
    }

    // Update the Voiture
    VoitureToUpdate.matricule = matricule;
    VoitureToUpdate.marque = marque;
    VoitureToUpdate.modele = modele;
    await VoitureToUpdate.save();

    // Send the updated Voiture as a response
    // res.json(VoitureToUpdate);
    res.redirect('/voitures');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  }

async function deleteVoiture(req, res, next){
  try {
    const { Voiture } = await db();

    const { id } = req.params;

    // Find the Voiture by ID
    const VoitureToDelete = await Voiture.findByPk(id);

    // Check if the Voiture exists
    if (!VoitureToDelete) {
      return res.status(404).json({ error: 'Voiture not found' });
    }

    // Delete the Voiture
    await VoitureToDelete.destroy();

    // Send a success message as a response
    //res.json({ message: 'Voiture deleted successfully' });
    res.redirect('/voitures');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
async function recherche(req, res, next){
  try {
    const { Voiture } = await db();
    
    const { matricule } = req.body;

    const VoitureToFind = await Voiture.findOne({ where: { matricule } });

    if (!VoitureToFind) {
      res.render('voiture.twig', { title: 'Search', RechVoiture: "notFound" });
    }
    else{
    res.render('voiture.twig', { title: 'Search', RechVoiture: VoitureToFind });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
} 

module.exports= { findAll, createVoiture, displayUpdatevoiture, updateVoiture, deleteVoiture, recherche }