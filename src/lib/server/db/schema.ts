import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const applications = pgTable('applications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  email: text('email').notNull(),

  // Personal Information
  lastName: text('last_name').notNull(),
  firstName: text('first_name').notNull(),
  middleInitial: text('middle_initial'),
  otherNames: text('other_names'),
  dateOfBirth: text('date_of_birth').notNull(),
  gender: text('gender').notNull(),
  ssn: text('ssn'),
  phoneNumber: text('phone_number').notNull(),
  stateId: text('state_id'),
  driverLicense: text('driver_license'),
  passportNumber: text('passport_number'),
  stateBarNumber: text('state_bar_number'),
  state: text('state'),

  // Questions
  visitedInmate: boolean('visited_inmate').notNull(),
  formerInmate: boolean('former_inmate').notNull(),
  restrictedAccess: boolean('restricted_access').notNull(),
  restrictionDetails: text('restriction_details'),
  felonyConviction: boolean('felony_conviction').notNull(),
  felonyDetails: text('felony_details'),
  onProbationParole: boolean('on_probation_parole').notNull(),
  pendingCharges: boolean('pending_charges').notNull(),

  // Authorization Type
  authorizationType: text('authorization_type').notNull(),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
