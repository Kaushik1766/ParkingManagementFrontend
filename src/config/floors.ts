export const FLOORS_MESSAGES = {
  TOAST: {
    ADDED_SUCCESS: (n: number) => `Floor ${n} added successfully`,
    OFFICE_ASSIGNED_SUCCESS: (office: string, floor: number) => `Office "${office}" assigned to Floor ${floor} successfully`,
  },
  ERRORS: {
    FLOOR_REQUIRED: 'Floor number is required',
    FLOOR_MIN: 'Floor number must be 0 or greater',
    OFFICE_NAME_REQUIRED: 'Office name is required',
    OFFICE_NAME_MIN: 'Office name must be at least 2 characters',
  }
};
