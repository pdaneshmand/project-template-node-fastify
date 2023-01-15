import { Document, model, Schema, Types } from 'mongoose';
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseAutopopulate = require('mongoose-autopopulate');
import { Translate } from './flat/Translate';
import { z } from 'zod';

export const IFeedbackType = z.object({
  name: z.string(),
  code: z.string(),
  translate: Translate,
  profiles: z.instanceof(Types.ObjectId),
  creator_id: z.instanceof(Types.ObjectId),
});

export type IFeedbackType = z.infer<typeof IFeedbackType>;

export interface IFeedbackTypeDocument extends IFeedbackType, Document {}

const feedbackType = new Schema<IFeedbackTypeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    translate: {
      type: Object,
    },
    profiles: {
      type: Schema.Types.ObjectId,
      ref: 'profiles',
      autopopulate: true,
      required: true,
    },
    creator_id: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      autopopulate: true,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'createdat', updatedAt: 'updateat' },
    collection: 'feedbackTypes',
  },
);
feedbackType.plugin(mongoosePaginate);
feedbackType.plugin(mongooseAutopopulate);
feedbackType.pre<IFeedbackTypeDocument>('updateOne', function (next: any) {
  this['updatedat'] = Date.now();
  next();
});

export const FeedbackType = model<IFeedbackTypeDocument>(
  'feedbackTypes',
  feedbackType,
);
