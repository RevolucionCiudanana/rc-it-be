const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
  origin: "*", // use your actual domain name (or localhost), using * is not recommended
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
    "x-client-key",
    "x-client-token",
    "x-client-secret",
    "Authorization",
    "x-access-token",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync().then(() => {
  initializeRoles();
  initializeUserRoles();
  initializeCountries();
  initializeSectors();
  initializeProfessions();
});

async function initializeRoles() {
  try {
    const count = await Role.count();
    if (count === 0) {
      await Role.create({
        id: 1,
        name: "worker",
        label: "Dipendente",
      });
      console.log("Default role 'Dipendente' created.");
      await Role.create({
        id: 2,
        name: "moderator",
        label: "Moderatore",
      });
      console.log("Default role 'Moderator' created.");
      await Role.create({
        id: 3,
        name: "admin",
        label: "Administrator",
      });
      console.log("Default role 'Admin' created.");

    } else {
      console.log("Roles table already populated.");
    }
  } catch (error) {
    console.error("Error initializing roles:", error);
  }
}


const Country = db.country;

async function initializeCountries() {
  try {
    const count = await Country.count();
    if (count === 0) {
      await Country.create({
        id: 1,
        name: "Italy",
        code: "italy",
      });
      await Country.create({
        id: 2,
        name: "Spagna",
        code: "spain",
      });
      await Country.create({
        id: 3,
        name: "Francia",
        code: "france",
      });
      await Country.create({
        id: 4,
        name: "Germania",
        code: "germany",
      });
    }
  } catch (error) {
    console.error("Error initializing user countries:", error);
  }
}



const Sector = db.sector;

async function initializeSectors() {
  try {
    const count = await Sector.count();
    if (count === 0) {
      await Sector.create({
        id: 1,
        name: "Attività domestiche",
        code: "SELECT_SECTOR_ATTIVITADOMESTICHE",
      });

      await Sector.create({
        id: 2,
        name: "Sanità/Assistenza",
        code: "SELECT_SECTOR_SANITAASSISTENZA",
      });

      await Sector.create({
        id: 3,
        name: "Educazione",
        code: "SELECT_SECTOR_EDUCAZIONE",
      });

      await Sector.create({
        id: 4,
        name: "Finanza",
        code: "SELECT_SECTOR_FINANZA",
      });

      await Sector.create({
        id: 5,
        name: "Ingegneria",
        code: "SELECT_SECTOR_INGEGNERIA",
      });

      await Sector.create({
        id: 6,
        name: "Marketing",
        code: "SELECT_SECTOR_MARKETING",
      });

      await Sector.create({
        id: 7,
        name: "Legale",
        code: "SELECT_SECTOR_LEGALE",
      });

      await Sector.create({
        id: 8,
        name: "Risorse Umane",
        code: "SELECT_SECTOR_RISORSEUMANE",
      });

      await Sector.create({
        id: 9,
        name: "Vendite",
        code: "SELECT_SECTOR_VENDITE",
      });

      await Sector.create({
        id: 10,
        name: "Tecnologia",
        code: "SELECT_SECTOR_TECNOLOGIA",
      });

      await Sector.create({
        id: 11,
        name: "Logistica",
        code: "SELECT_SECTOR_LOGISTICA",
      });

      await Sector.create({
        id: 12,
        name: "Altro",
        code: "SELECT_SECTOR_ALTRO",
      });

    }
  } catch (error) {
    console.error("Error initializing user sector:", error);
  }

}

const Profession = db.profession;

async function initializeProfessions() {
  try {
    const count = await Profession.count();
    if (count === 0) {
      // Attività domestiche
      await Profession.create({ id: 70, sectorId: 1, name: "Colf", code: "SELECT_PROFESSION_COLF" });
      await Profession.create({ id: 71, sectorId: 1, name: "Badante", code: "SELECT_PROFESSION_BADANTE" });
      await Profession.create({ id: 72, sectorId: 1, name: "Giardiniere", code: "SELECT_PROFESSION_GIARDINIERE" });
      await Profession.create({ id: 73, sectorId: 1, name: "Babysitter", code: "SELECT_PROFESSION_BABYSITTER" });
      await Profession.create({ id: 74, sectorId: 1, name: "Pulitore", code: "SELECT_PROFESSION_PULITORE" });
      await Profession.create({ id: 75, sectorId: 1, name: "Cameriere", code: "SELECT_PROFESSION_CAMERIERE" });
      await Profession.create({ id: 76, sectorId: 1, name: "Cuoco", code: "SELECT_PROFESSION_CUOCO" });
      await Profession.create({ id: 77, sectorId: 1, name: "Assistente domestico", code: "SELECT_PROFESSION_ASSISTENTEDOMESTICO" });

      // Sanità/Assistenza
      await Profession.create({ id: 1, sectorId: 2, name: "Medico", code: "SELECT_PROFESSION_MEDICO" });
      await Profession.create({ id: 2, sectorId: 2, name: "Infermiere", code: "SELECT_PROFESSION_INFERMIERE" });
      await Profession.create({ id: 3, sectorId: 2, name: "Tecnico di laboratorio", code: "SELECT_PROFESSION_TECNICODILABORATORIO" });
      await Profession.create({ id: 4, sectorId: 2, name: "Fisioterapista", code: "SELECT_PROFESSION_FISIOTERAPISTA" });
      await Profession.create({ id: 5, sectorId: 2, name: "Chirurgo", code: "SELECT_PROFESSION_CHIRURGO" });
      await Profession.create({ id: 6, sectorId: 2, name: "Dentista", code: "SELECT_PROFESSION_DENTISTA" });
      await Profession.create({ id: 7, sectorId: 2, name: "Farmacista", code: "SELECT_PROFESSION_FARMACISTA" });
      await Profession.create({ id: 8, sectorId: 2, name: "Badante", code: "SELECT_PROFESSION_BADANTE" });
      await Profession.create({ id: 9, sectorId: 2, name: "Operatore socio-sanitario (OSS)", code: "SELECT_PROFESSION_OPERATOREOSS" });
      await Profession.create({ id: 10, sectorId: 2, name: "Assistente domiciliare", code: "SELECT_PROFESSION_ASSISTENTEDOMICILIARE" });
      await Profession.create({ id: 11, sectorId: 2, name: "Assistente alla persona", code: "SELECT_PROFESSION_ASSISTENTEALLAPERSONA" });
      await Profession.create({ id: 12, sectorId: 2, name: "Coordinatore dei servizi di assistenza", code: "SELECT_PROFESSION_COORDINATOREASSISTENZA" });

      // Educazione
      await Profession.create({ id: 13, sectorId: 3, name: "Insegnante", code: "SELECT_PROFESSION_INSEGNANTE" });
      await Profession.create({ id: 14, sectorId: 3, name: "Professore", code: "SELECT_PROFESSION_PROFESSORE" });
      await Profession.create({ id: 15, sectorId: 3, name: "Tutor", code: "SELECT_PROFESSION_TUTOR" });
      await Profession.create({ id: 16, sectorId: 3, name: "Educatore", code: "SELECT_PROFESSION_EDUCATORE" });
      await Profession.create({ id: 17, sectorId: 3, name: "Formatore", code: "SELECT_PROFESSION_FORMATORE" });
      await Profession.create({ id: 18, sectorId: 3, name: "Coordinatore didattico", code: "SELECT_PROFESSION_COORDINATOREDIDATTICO" });

      // Finanza
      await Profession.create({ id: 19, sectorId: 4, name: "Contabile", code: "SELECT_PROFESSION_CONTABILE" });
      await Profession.create({ id: 20, sectorId: 4, name: "Analista finanziario", code: "SELECT_PROFESSION_ANALISTAFINANZIARIO" });
      await Profession.create({ id: 21, sectorId: 4, name: "Consulente", code: "SELECT_PROFESSION_CONSULENTE" });
      await Profession.create({ id: 22, sectorId: 4, name: "Revisore dei conti", code: "SELECT_PROFESSION_REVISOREDEICONTI" });
      await Profession.create({ id: 23, sectorId: 4, name: "Gestore patrimoniale", code: "SELECT_PROFESSION_GESTOREPATRIMONIALE" });
      await Profession.create({ id: 24, sectorId: 4, name: "Addetto alla finanza aziendale", code: "SELECT_PROFESSION_ADDETTOFINANZA" });

      // Ingegneria
      await Profession.create({ id: 25, sectorId: 5, name: "Ingegnere civile", code: "SELECT_PROFESSION_INGEGNERECIVILE" });
      await Profession.create({ id: 26, sectorId: 5, name: "Ingegnere meccanico", code: "SELECT_PROFESSION_INGEGNEREMECCANICO" });
      await Profession.create({ id: 27, sectorId: 5, name: "Ingegnere elettronico", code: "SELECT_PROFESSION_INGEGNERELETTRONICO" });
      await Profession.create({ id: 28, sectorId: 5, name: "Ingegnere chimico", code: "SELECT_PROFESSION_INGEGNERICHIMICO" });
      await Profession.create({ id: 29, sectorId: 5, name: "Ingegnere gestionale", code: "SELECT_PROFESSION_INGEGNERGESTIONALE" });
      await Profession.create({ id: 30, sectorId: 5, name: "Progettista", code: "SELECT_PROFESSION_PROGETTISTA" });

      // Marketing
      await Profession.create({ id: 31, sectorId: 6, name: "Specialista SEO", code: "SELECT_PROFESSION_SPECIALISTASEO" });
      await Profession.create({ id: 32, sectorId: 6, name: "Content Creator", code: "SELECT_PROFESSION_CONTENTCREATOR" });
      await Profession.create({ id: 33, sectorId: 6, name: "Social Media Manager", code: "SELECT_PROFESSION_SOCIALMEDIAMANAGER" });
      await Profession.create({ id: 34, sectorId: 6, name: "Brand Manager", code: "SELECT_PROFESSION_BRANDMANAGER" });
      await Profession.create({ id: 35, sectorId: 6, name: "Digital Marketer", code: "SELECT_PROFESSION_DIGITALMARKETER" });
      await Profession.create({ id: 36, sectorId: 6, name: "Copywriter", code: "SELECT_PROFESSION_COPYWRITER" });
      await Profession.create({ id: 37, sectorId: 6, name: "Stratega di marketing", code: "SELECT_PROFESSION_STRATEGADIMARKETING" });

      // Legale
      await Profession.create({ id: 38, sectorId: 7, name: "Avvocato", code: "SELECT_PROFESSION_AVVOCATO" });
      await Profession.create({ id: 39, sectorId: 7, name: "Notaio", code: "SELECT_PROFESSION_NOTAIO" });
      await Profession.create({ id: 40, sectorId: 7, name: "Consulente legale", code: "SELECT_PROFESSION_CONSULENTELEGALE" });
      await Profession.create({ id: 41, sectorId: 7, name: "Paralegale", code: "SELECT_PROFESSION_PARALEGALE" });
      await Profession.create({ id: 42, sectorId: 7, name: "Giurista", code: "SELECT_PROFESSION_GIURISTA" });
      await Profession.create({ id: 43, sectorId: 7, name: "Mediatore", code: "SELECT_PROFESSION_MEDIATORE" });

      // Risorse Umane
      await Profession.create({ id: 44, sectorId: 8, name: "Recruiter", code: "SELECT_PROFESSION_RECRUITER" });
      await Profession.create({ id: 45, sectorId: 8, name: "HR Manager", code: "SELECT_PROFESSION_HRMANAGER" });
      await Profession.create({ id: 46, sectorId: 8, name: "Specialista della formazione", code: "SELECT_PROFESSION_SPECIALISTAFORMAZIONE" });
      await Profession.create({ id: 47, sectorId: 8, name: "Specialista della busta paga", code: "SELECT_PROFESSION_SPECIALISTABUSTAPAGA" });
      await Profession.create({ id: 48, sectorId: 8, name: "Consulente del lavoro", code: "SELECT_PROFESSION_CONSULENTEDOLLAVORO" });
      await Profession.create({ id: 49, sectorId: 8, name: "HR Business Partner", code: "SELECT_PROFESSION_HRBUSINESSPARTNER" });

      // Vendite
      await Profession.create({ id: 50, sectorId: 9, name: "Venditore", code: "SELECT_PROFESSION_VENDITORE" });
      await Profession.create({ id: 51, sectorId: 9, name: "Account Manager", code: "SELECT_PROFESSION_ACCOUNTMANAGER" });
      await Profession.create({ id: 52, sectorId: 9, name: "Sales Manager", code: "SELECT_PROFESSION_SALESMANAGER" });
      await Profession.create({ id: 53, sectorId: 9, name: "Addetto vendite", code: "SELECT_PROFESSION_ADDETTOVENDITE" });
      await Profession.create({ id: 54, sectorId: 9, name: "Rappresentante commerciale", code: "SELECT_PROFESSION_RAPPRESENTANTECOMMERCIALE" });
      await Profession.create({ id: 55, sectorId: 9, name: "Sales Executive", code: "SELECT_PROFESSION_SALESEXECUTIVE" });

      // Tecnologia
      await Profession.create({ id: 56, sectorId: 10, name: "Sviluppatore software", code: "SELECT_PROFESSION_SVILUPPATORESOFTWARE" });
      await Profession.create({ id: 57, sectorId: 10, name: "Data Scientist", code: "SELECT_PROFESSION_DATASCIENTIST" });
      await Profession.create({ id: 58, sectorId: 10, name: "Web Developer", code: "SELECT_PROFESSION_WEBDEVELOPER" });
      await Profession.create({ id: 59, sectorId: 10, name: "Sistemista", code: "SELECT_PROFESSION_SISTEMISTA" });
      await Profession.create({ id: 60, sectorId: 10, name: "Analista programmatore", code: "SELECT_PROFESSION_ANALISTAPROGRAMMATORE" });
      await Profession.create({ id: 61, sectorId: 10, name: "DevOps Engineer", code: "SELECT_PROFESSION_DEVOPSENGINEER" });

      // Logistica
      await Profession.create({ id: 62, sectorId: 11, name: "Magazziniere", code: "SELECT_PROFESSION_MAGAZZINIERE" });
      await Profession.create({ id: 63, sectorId: 11, name: "Addetto alla logistica", code: "SELECT_PROFESSION_ADDETTOALLALOGISTICA" });
      await Profession.create({ id: 64, sectorId: 11, name: "Responsabile della logistica", code: "SELECT_PROFESSION_RESPONSABILEDELALOGISTICA" });
      await Profession.create({ id: 65, sectorId: 11, name: "Autista", code: "SELECT_PROFESSION_AUTISTA" });
      await Profession.create({ id: 66, sectorId: 11, name: "Coordinatore della logistica", code: "SELECT_PROFESSION_COORDINATOREDELALOGISTICA" });
      await Profession.create({ id: 67, sectorId: 11, name: "Pianificatore della produzione", code: "SELECT_PROFESSION_PIANIFICATOREDELAPRODUZIONE" });

      // Altro
      await Profession.create({ id: 68, sectorId: 12, name: "Libero professionista", code: "SELECT_PROFESSION_LIBEROPROFESSIONISTA" });
      await Profession.create({ id: 69, sectorId: 12, name: "Altro", code: "SELECT_PROFESSION_ALTRO" });

    }
  } catch (error) {
    console.error("Error initializing user professions:", error);
  }
}

async function initializeUserRoles() {
  try {
    const count = await UserRoles.count();
    if (count === 0) {
      // Assuming role ID 1 and user ID 1 exist for demonstration purposes
      await UserRoles.create({
        userId: 1,
        roleId: 3,
      });
      console.log("Default user role created.");
    } else {
      console.log("User roles table already populated.");
    }
  } catch (error) {
    console.error("Error initializing user roles:", error);
  }
}

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to cms application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/email.routes")(app);
require("./app/routes/event.routes")(app);
require("./app/routes/sector.routes")(app);
require("./app/routes/profession.routes")(app);
require("./app/routes/member.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
