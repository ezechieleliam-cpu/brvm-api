import mongoose from 'mongoose';

/**
 * Interface représentant une actualité BRVM.
 */
export interface INews {
  title: string;
  source: string;
  url: string;
  html: string;
  date: Date;
  category?: string;     // ex: "Communiqué", "Analyse", "Cours"
  sourceLogo?: string;   // URL vers le logo du site source
}

/**
 * Schéma Mongoose pour les actualités BRVM.
 */
const newsSchema = new mongoose.Schema<INews>({
  title: { type: String, required: true },
  source: { type: String, required: true },
  url: { type: String, required: true },
  html: { type: String, required: true },
  date: {
    type: Date,
    required: true,
    default: () => new Date()
  },
  category: { type: String, required: false },
  sourceLogo: { type: String, required: false }
});

/**
 * Modèle Mongoose exporté.
 */
const News = mongoose.model<INews>('News', newsSchema);
export default News;

