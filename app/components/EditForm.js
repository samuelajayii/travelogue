/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useActionState } from 'react';
import { InputLabel, TextField, Button, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import postFormSchema from '../utils/validation';
import { z } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { createPost } from '../utils/actions';


const EditForm = ({ titleProps, destinationProps, dateProps, imageProps, contentProps }) => {
    const [title, setTitle] = useState(titleProps || '');
    const [destination, setDestination] = useState(destinationProps || '');
    const [date, setDate] = useState('');
    const [content, setContent] = useState(contentProps || '');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); // Show existing image if available
    const [errors, setErrors] = useState({});

    const router = useRouter();

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleFormSubmit = async (prevState, formData) => {
        const formValues = {
            title,
            destination,
            date,
            image,
            content,
        };

        try {
            await postFormSchema.parseAsync(formValues); // Validate with Zod
            const result = await createPost(prevState, formData, content); // Your submit function
            toast.success('Post successfully updated!', { position: 'top-center' });
            handleRemoveImage();
            setContent('');
            setDate('');

            router.push('/home');
            return { ...prevState, status: 'SUCCESS' };
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);
                toast.error('Validation failed. Please check your inputs and try again.', { position: 'top-center' });
                return { ...prevState, error: 'Validation failed', status: 'ERROR' };
            }
            console.error('Unexpected error:', error);
            return { ...prevState, error: 'Unexpected error', status: 'ERROR' };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: '',
        status: 'INITIAL',
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
            setImage(file);
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <form
            action={formAction}
            className="items-center flex flex-col justify-center my-14"
        >
            <div className="flex text-center flex-col gap-10">
                {/* Title Input */}
                <div>
                    <TextField
                        sx={{ width: { xs: '90%', sm: 600 } }}
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update state
                        label="Post Title"
                        variant="filled"
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>

                {/* Destination Input */}
                <div>
                    <TextField
                        sx={{ width: { xs: '90%', sm: 600 } }}
                        id="destination"
                        name="destination"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)} // Update state
                        label="Destination"
                        variant="filled"
                    />
                    {errors.destination && <p className="text-red-500">{errors.destination}</p>}
                </div>

                {/* Date Input */}
                <div>
                    <Box
                        sx={{
                            width: { xs: '90%', sm: 600 },
                            margin: '0 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="Select Date"
                            type="date"
                            value={date}
                            name="date"
                            id="date"
                            onChange={handleDateChange}
                            required
                            slotProps={{
                                inputLabel: {
                                    shrink: true, // Keeps the label above the input
                                },
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                </div>

                {/* Image Input */}
                <div>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        maxWidth={{ xs: '90%', sm: 600 }}
                        margin="0 auto"
                    >
                        <Button variant="contained" component="label">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                id="images"
                                name="images"
                                onChange={handleImageChange}
                            />
                        </Button>

                        {preview && (
                            <Box mt={2}>
                                <Button
                                    onClick={handleRemoveImage}
                                    variant="outlined"
                                    color="error"
                                    sx={{ mb: 3 }}
                                    style={{ width: '100%' }}
                                >
                                    Remove Image
                                </Button>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    id="images"
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            </Box>
                        )}

                        <TextField
                            disabled
                            value={image?.name || ''}
                            label="File Name"
                            variant="outlined"
                        />
                    </Box>
                    {errors.image && <p className="text-red-500">{errors.image}</p>}
                </div>

                {/* Content Input */}
                <div className="" data-color-mode="light">
                    <Box
                        sx={{
                            width: { xs: '90%', sm: 600 },
                            margin: '0 auto',
                        }}
                    >
                        <InputLabel
                            color="info"
                            margin="dense"
                            sx={{ mb: 1, fontSize: 17 }}
                        >
                            Content
                        </InputLabel>
                        <MDEditor
                            value={content}
                            onChange={(value) => setContent(value)} // Update state
                            id="content"
                            height={300}
                            style={{ overflow: 'hidden' }}
                            textareaProps={{
                                placeholder: 'Please tell us about your trip',
                            }}
                        />
                        {errors.content && <p className="text-red-500">{errors.content}</p>}
                    </Box>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                sx={{
                    mt: 2,
                    width: { xs: '90%', sm: 'auto' },
                }}
                disabled={isPending}
                variant="contained"
                color="info"
            >
                {isPending ? 'Submitting...' : 'Submit Your Story'}
            </Button>
            <ToastContainer />
        </form>
    );
};


export default EditForm