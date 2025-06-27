import mongoose, { Schema } from 'mongoose';

const demographicSchema = new Schema(
  {
    pID: { type: String, required: true },
    age: String, // 1
    sexAssignedAtBirth: String, //2
    genderIdentity: String, // 3
    additionalGender: String, // 3
    sexualOrientation: String, // 4
    additionalsexualOrientation: String, // 4
    ethnicOrigins: [String], // 5
    raceIdentity: [String], // 6
    disability: [String], // 7
    disabilityImpact: String, // 7-1
    country: String, // 8
    additionalCountry: String, // 8
    dualNationality: String, // 9
    dualNationalityGreaterImportance: String, // 9-1
    city: String, // 10
    states: String, // 10
    educationLevel: String, // 11
    employmentStatus: String, // 12
    major: String, // 12-1
    jobResponsibilities: String, // 12-2
    householdIncome: String, // 13
    familyIncome: String, // 14
    financialSituation: String, // 15
    socialClass: String, // 16
    livingWith: [String], // 17
    politicalViews: String, // 18
    religiousPreference: String, // 19
  },
  {
    timestamps: true,
  }
);

const Demographic =
  (mongoose.models && mongoose.models.demographic) ||
  mongoose.model('demographic', demographicSchema);

export default Demographic;
