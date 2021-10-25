//Importo modelo de datos
const db = require("../models");
const ingredients = db.ingredient;
const Op = db.Sequelize.Op; //IMPORTAMOS FUNCIONES ORM DE SEQUELIZE

const IngredientController = {}; //CREAMOS EL OBJETO CONTROLADOR



//CRUD
IngredientController.getAll = (req, res) => {
  
    ingredients.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha surgido algún error al intentar acceder a los ingredientes."
        });
      });
  };

//-------------------------------------------------------------------------------------

IngredientController.getById = (req, res) => {
    const id = req.params.id;
  
    ingredients.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `No existe el ingrediente con el id ${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha surgido algún error al intentar acceder al ingrediente con el id " + id + "."
        });
      });
  };

//-------------------------------------------------------------------------------------

IngredientController.create = (req, res) => {

    if (!req.body.nombre) {
      res.status(400).send({
        message: "¡El contenido no puede estar vacío!"
      });
      return;
    }

    const newIngredient = {
        nombre: req.body.nombre,
    };

    ingredients.create(newIngredient)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha surgido algún error al intentar añadir un nuevo ingrediente."
        });
      });
  };

//-------------------------------------------------------------------------------------

IngredientController.update = (req, res) => {
    const id = req.params.id;
  
    ingredients.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: `El ingrediente con id ${id} ha sido actualizado correctamente.`
          });
        } else {
          res.send({
            message: `No se pudo actualizar el ingrediente ${id}`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Ha surgido algún error al intentar actualizar el ingrediente " + id + "."
        });
      });
  };


// //-------------------------------------------------------------------------------------
// //GET categories by Type from database  
// //FindByType
// IngredientController.getByType = (req, res) => {
//     ingredients.findAll({ where: { type: req.params.type } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving categories."
//         });
//       });
//   };


// //-------------------------------------------------------------------------------------
// //DELETE a ingredients by Id from database
// IngredientController.delete = (req, res) => {
//     const id = req.params.id;
  
//     ingredients.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "ingredients was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete ingredients with id=${id}. Maybe Movie was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete ingredients with id=" + id
//         });
//       });
//   };


// //-------------------------------------------------------------------------------------
// //DELETE all categories from database
// //delete all categories   
// IngredientController.deleteAll = (req, res) => {
//     ingredients.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} categories were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all categories."
//         });
//       });
//   };

module.exports = IngredientController;