import { useState, useEffect } from 'react';
import { FaSave, FaImage, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAbout,
    createAbout,
    updateAbout,
    updateAboutImage,
    clearCreateAboutUs,
    clearUpdateAboutUs,
    clearChangeImageAboutUs
} from '../../redux/slices/aboutSlice';
import AdminLayout from '../../component/layout/AdminLayout';
import { toast } from 'react-toastify';
import config from '../../utils/config';


const AboutUsDashboard = () => {
    const dispatch = useDispatch();
    const {
        aboutUs,
        loading,
        error,
        isAboutCreated,
        loadingCreatingAbout,
        errorCreatingAbout,
        isAboutUpdated,
        loadingUpdatingAbout,
        errorUpdatingAbout,
        isImageChange,
        loadingChaningImage,
        errorChangingImage
    } = useSelector(state => state.about);

    const [formValues, setFormValues] = useState({
        title: '',
        subtitle: '',
        main_description: '',
        additional_description: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [pendingImageFile, setPendingImageFile] = useState(null);

    useEffect(() => {
        dispatch(getAbout());
    }, [dispatch]);

    useEffect(() => {
        if (aboutUs) {
            setFormValues({
                title: aboutUs.title || '',
                subtitle: aboutUs.subtitle || '',
                main_description: aboutUs.main_description || '',
                additional_description: aboutUs.additional_description || '',
                image: null
            });
            setImagePreview(aboutUs.image_url ? `${config.API_BASE_URL}/${aboutUs.image_url}` : null);
        }
    }, [aboutUs]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageClick = () => {
        if (aboutUs?.image_url) {
            setSelectedImage(`${config.API_BASE_URL}/${aboutUs.image_url}`);
            setShowImageModal(true);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (aboutUs) {
                setPendingImageFile(file);
                setShowConfirmDialog(true);
            } else {
                setFormValues(prev => ({
                    ...prev,
                    image: file
                }));
                setImagePreview(URL.createObjectURL(file));
            }
        }
    };

    const confirmImageChange = () => {
        if (pendingImageFile) {
            const formData = new FormData();
            formData.append('image', pendingImageFile);
            dispatch(updateAboutImage({ data: formData }));
            setShowConfirmDialog(false);
            setPendingImageFile(null);
        }
    };

    const cancelImageChange = () => {
        setShowConfirmDialog(false);
        setPendingImageFile(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (loadingCreatingAbout || loadingUpdatingAbout) return;

        if (aboutUs) {
            const formData = new FormData();
            formData.append('title', formValues.title);
            formData.append('subtitle', formValues.subtitle);
            formData.append('main_description', formValues.main_description);
            formData.append('additional_description', formValues.additional_description);
            dispatch(updateAbout({ data: formData }));
        } else {
            const formData = new FormData();
            formData.append('title', formValues.title);
            formData.append('subtitle', formValues.subtitle);
            formData.append('main_description', formValues.main_description);
            formData.append('additional_description', formValues.additional_description);
            if (formValues.image) {
                formData.append('image', formValues.image);
            }
            dispatch(createAbout({ data: formData }));
        }
    };

    useEffect(() => {
        if (isAboutCreated) {
            toast.success("About us content created successfully!");
            dispatch(getAbout());
            dispatch(clearCreateAboutUs());
        } else if (errorCreatingAbout) {
            toast.error("Failed to create about us content");
        }
    }, [isAboutCreated, errorCreatingAbout, dispatch]);

    useEffect(() => {
        if (isAboutUpdated) {
            toast.success("About us content updated successfully!");
            dispatch(getAbout());
            dispatch(clearUpdateAboutUs());
        } else if (errorUpdatingAbout) {
            toast.error("Failed to update about us content");
        }
    }, [isAboutUpdated, errorUpdatingAbout, dispatch]);

    useEffect(() => {
        if (isImageChange) {
            toast.success("Image updated successfully!");
            dispatch(getAbout());
            dispatch(clearChangeImageAboutUs());
        } else if (errorChangingImage) {
            toast.error("Failed to update image");
        }
    }, [isImageChange, errorChangingImage, dispatch]);

    return (
        <AdminLayout>
            <div className="h-screen flex flex-col">
                <div className="p-4">
                    <div className="rounded-lg shadow-2xl p-4" style={{ backgroundColor: "var(--color-navy-dark)" }}>
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold text-white">About Us</h1>
                            <p className="text-white">Manage your about us content and image</p>
                        </div>

                        {loading && (
                            <div className="flex justify-center items-center py-8">
                                <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-4 p-4 bg-red-600 text-white rounded">
                                {error}
                            </div>
                        )}

                        {!loading && !error && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="title" className="block text-white font-medium mb-1">Title</label>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            value={formValues.title}
                                            onChange={handleChange}
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                            placeholder="Enter about us title"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subtitle" className="block text-white font-medium mb-1">Subtitle</label>
                                        <input
                                            id="subtitle"
                                            type="text"
                                            name="subtitle"
                                            value={formValues.subtitle}
                                            onChange={handleChange}
                                            className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                            placeholder="Enter about us subtitle"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="main_description" className="block text-white font-medium mb-1">Main Description</label>
                                    <textarea
                                        id="main_description"
                                        name="main_description"
                                        value={formValues.main_description}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                        placeholder="Enter main description"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="additional_description" className="block text-white font-medium mb-1">Additional Description</label>
                                    <textarea
                                        id="additional_description"
                                        name="additional_description"
                                        value={formValues.additional_description}
                                        onChange={handleChange}
                                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                                        placeholder="Enter additional description"
                                        rows="3"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-white font-medium mb-1">Image</label>
                                    <div className="flex items-center space-x-4">
                                        {!aboutUs && (
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                    id="image-upload"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
                                                >
                                                    <FaImage className="mr-2" />
                                                    Choose Image
                                                </label>
                                            </div>
                                        )}
                                        {imagePreview && (
                                            <div className="relative w-24 h-24 cursor-pointer" onClick={handleImageClick}>
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {showImageModal && (
                                    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                                        <div className="relative bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
                                            <button
                                                onClick={() => setShowImageModal(false)}
                                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                            >
                                                <FaTimes size={24} />
                                            </button>
                                            <img
                                                src={selectedImage}
                                                alt="Full size preview"
                                                className="max-w-full max-h-[80vh] object-contain"
                                            />
                                            <div className="mt-4 flex justify-center">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
                                                >
                                                    <FaImage className="mr-2" />
                                                    {aboutUs ? 'Update Image' : 'Choose Image'}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showConfirmDialog && (
                                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50" style={{ backgroundColor: "var(--color-navy-dark)" }}>
                                        <div className=" p-6 rounded-lg shadow-xl max-w-md w-full">
                                            <h3 className="text-xl font-semibold mb-4">Confirm Image Change</h3>
                                            <p className="mb-6">Are you sure you want to change the image?</p>
                                            <div className="flex justify-end space-x-4">
                                                <button
                                                    onClick={cancelImageChange}
                                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={confirmImageChange}
                                                    disabled={loadingChaningImage}
                                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                                                >
                                                    {loadingChaningImage ? (
                                                        <div className="flex items-center">
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                            Changing...
                                                        </div>
                                                    ) : (
                                                        'Confirm Change'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-center pt-2">
                                    <button
                                        type="submit"
                                        style={{ backgroundColor: 'var(--color-purple-dark)' }}
                                        className="flex items-center px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                                        disabled={loadingCreatingAbout || loadingUpdatingAbout}
                                    >
                                        <FaSave className="mr-2" />
                                        {loadingCreatingAbout || loadingUpdatingAbout ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AboutUsDashboard;