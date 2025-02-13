export const location = new Schema(
  {
    ciudad: {
      type: String,
      required: true,
      minLength: 2,
    },
    src: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
