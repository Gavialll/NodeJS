import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from './knexfile';

// Створюємо інстанс Knex
const knex = Knex(knexConfig.development);

// Прив'язуємо Knex до Objection.js
Model.knex(knex);

export default knex;
