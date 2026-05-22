export const getDepartmentName = (dept) => {
  const mapping = {
    'POTHOLE': 'Road & Traffic Maintenance',
    'GARBAGE': 'Sanitation & Waste Management',
    'STREETLIGHT': 'Public Lighting & Electrical',
    'WATER': 'Water Supply & Sewerage',
    'DRAINAGE': 'Drainage & Stormwater',
  };
  return mapping[dept] || dept;
};
