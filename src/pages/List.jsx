import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";

function ListingPage() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState(null);

  const [loading, setLoading] = useState(false);

  const { handleCreateNewListing } = useFirebase();

  const uploadImageToCloudinary = async (file) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_KEY);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error("Cloudinary upload failed", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverPic) {
      alert("Please upload a cover image.");
      return;
    }

    // Upload Image to Cloudinary 
    setLoading(true);
    const uploadedImageUrl = await uploadImageToCloudinary(coverPic);

    if (!uploadedImageUrl) {
      alert("Image upload failed!");
      setLoading(false);
      return;
    }

    // Now, pass the Cloudinary URL to Firebase
    await handleCreateNewListing(name, isbnNumber, price, uploadedImageUrl);
    setLoading(false)
  };


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-3" controlId="formBookName">
        <Form.Label>Enter Book Name</Form.Label>
        <Form.Control
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Book Name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBookIsbn">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          onChange={(e) => setIsbnNumber(e.target.value)}
          value={isbnNumber}
          type="text"
          placeholder="ISBN Number"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBookPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="text"
          placeholder="Enter Price"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBookCover">
        <Form.Label>Cover Image</Form.Label>
        <Form.Control
          onChange={(e) => setCoverPic(e.target.files[0])}
          type="file"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {loading ? "Uploading..." : "Create"}
      </Button>
    </Form>
  );
}

export default ListingPage;
