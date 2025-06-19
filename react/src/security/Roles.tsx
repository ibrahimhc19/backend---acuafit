
export const Roles = {
  Admin: 'admin',
  Instructor: 'instructor',
  Accounting: 'accounting',
};

export const AppPermissions = {
  View: [
    Roles.Admin,
    Roles.Instructor,
    Roles.Accounting,
  ],
  Create: [
    Roles.Admin,
    Roles.Instructor,
    Roles.Accounting,
],
  Edit: [
    Roles.Admin,
    Roles.Instructor,
    Roles.Accounting,
  ],
  Delete: [
    Roles.Admin,
    Roles.Instructor,
    Roles.Accounting,
]
};

export const AppScopes = {
  Students: [
    Roles.Admin,
  ],
  Locations: [
    Roles.Admin,
  ],
  Schedules: [
    Roles.Admin,
    Roles.Instructor,
  ],
  Payments: [
    Roles.Admin,
    Roles.Accounting,
  ],
};
