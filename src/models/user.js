// Tipo de datos
const { DataTypes } = require("sequelize");

// Definimos el modelo
module.exports = (sequelize) => {
    sequelize.define('user', {
        usr_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        usr_username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usr_email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        usr_photo: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        usr_role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        },
        usr_description: {
            type: DataTypes.STRING
        },
        usr_location: {
            type: DataTypes.JSON 
        },
        usr_score: {
            type: DataTypes.FLOAT,
            validate: {
                min: 1,
                max: 5
            },
            set(value) {
                // Setemos el valor de usr_score con el value recibido
                this.setDataValue('usr_score', value);

                // Obtenemos el plan del usuario
                const plan = this.getDataValue('usr_plan');

                if(plan === "premium") { // Si tiene el plan premium...
                    // Seteamos el valor de usr_relevanceScore con el valor de usr_score + 2
                    this.setDataValue('usr_relevanceScore', value + 2);
                } else { // Si el usuario tiene el plan free
                    // Seteamos el valor de usr_relevanceScore con el valor de usr_score
                    this.setDataValue('usr_relevanceScore', value);
                }

            }
        },
        usr_isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        usr_social: {
            type: DataTypes.JSON // instagram, facebook, github, linkedin
        },
        usr_phone: {
            type: DataTypes.STRING
        },
        usr_country: {
            type: DataTypes.STRING
        },
        usr_gender: {
            type: DataTypes.STRING
        },
        usr_charge: {
            type: DataTypes.STRING
        },
        usr_alerts: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        usr_banner: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        usr_plan: {
            type: DataTypes.ENUM('free', 'premium'),
            allowNull: false,
            defaultValue: 'free',
            set(value) {
                // Seteamos el usr_plan con el valor recibido
                this.setDataValue('usr_plan', value);

                // Obtenemos el valor de usr_score
                const score = this.getDataValue('usr_score');

                if(value === "premium") { // Si el usuario tiene plan premium...
                    // Seteamos el valor de usr_relevanceScore con el valor de usr_score + 2
                    this.setDataValue('usr_relevanceScore', (score || 1) + 2);

                } else { // Si el usuario tiene el plan free...
                    // Seteamos el valor de el usr_relevanceScore con el valor de usr_score
                    this.setDataValue('usr_relevanceScore', score || 1);
                }
            }
        },
        usr_relevanceScore: {
            type: DataTypes.FLOAT,
            defaultValue: 1.00
        }

    });
}
