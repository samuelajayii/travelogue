/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useActionState } from 'react';
import { InputLabel, TextField, Button, Box } from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import postFormSchema from '../utils/validation';
import { z } from 'zod';

const PostForm = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState('**Hello World**');
    const [selectedDate, setSelectedDate] = useState('');

    const handleFormSubmit = async (prevState, formData) => {
        // Gather form data manually
        const formValues = {
            title: formData.get('title'),
            location: formData.get('location'),
            selectedDate,
            image,
            content,
        };

        try {
            // Validate using Zod schema
            await postFormSchema.parseAsync(formValues);
            console.log('Form submitted successfully:', formValues);

            return { ...prevState, status: 'SUCCESS' }; 
        } catch (error) {
            if (error instanceof z.ZodError) {
                
                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);

                // Provide user feedback
                alert('Validation failed. Please check your inputs and try again.');

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

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    return (
        <form
            action={formAction}
            className="items-center flex flex-col justify-center my-14"
        >
            <div className="flex flex-col gap-10">
                <div>
                    <TextField
                        sx={{ width: 600 }}
                        id="title"
                        name="title"
                        required
                        label="Post Title"
                        variant="filled"
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>

                <div>
                    <TextField
                        sx={{ width: 600 }}
                        id="location"
                        name="location"
                        required
                        label="Location"
                        variant="filled"
                    />
                    {errors.location && <p className="text-red-500">{errors.location}</p>}
                </div>

                <div>
                    <Box sx={{ width: 600 }} margin="0 auto" display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Select Date"
                            type="date"
                            value={selectedDate}
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

                <div>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={600} margin="0 auto">
                        <Button variant="contained" component="label">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
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
                <div data-color-mode="light">
                    <InputLabel
                        color="info"
                        margin="dense"
                        sx={{ mb: 1, fontSize: 17 }}
                    >
                        Content
                    </InputLabel>
                    <MDEditor
                        value={content}
                        onChange={(value) => setContent(value)}
                        id="content"
                        height={300}
                        style={{ overflow: 'hidden' }}
                        textareaProps={{
                            placeholder: 'Please tell us about your trip',
                        }}
                    />
                    {errors.content && <p className="text-red-500">{errors.content}</p>}
                </div>
            </div>
            <Button
                type="submit"
                className="mt-4"
                disabled={isPending}
                variant="contained"
                color="info"
            >
                {isPending ? 'Submitting...' : 'Submit Your Pitch'}
            </Button>
        </form>
    );
};

export default PostForm;
