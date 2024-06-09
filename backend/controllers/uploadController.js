const uploadAvatar = (req, res) => {
    // Implement logic for avatar upload
    res.status(200).json({ message: 'Avatar uploaded successfully' });
  };
  
  const uploadDocument = (req, res) => {
    // Implement logic for document upload
    res.status(200).json({ message: 'Document uploaded successfully' });
  };
  
  module.exports = {
    uploadAvatar,
    uploadDocument
  };