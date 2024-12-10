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

const PostForm = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [content, setContent] = useState('**Hello Worldddddddddddd**');
    const [date, setDate] = useState('');

    const router = useRouter()

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleFormSubmit = async (prevState, formData) => {

        const formValues = {
            title: formData.get('title'),
            destination: formData.get('destination'),
            date,
            image,
            content,
        };

        try {
            // Validate using Zod schema
            await postFormSchema.parseAsync(formValues);
            const result = await createPost(prevState, formData, content)
            console.log('Form submitted successfully:', formValues);
            console.log(result)
            toast.success('Post successfully submitted for upload', { position: 'top-center' })
            handleRemoveImage();
            setContent('');
            setDate('');

            // router.push('/home')

            return { ...prevState, status: 'SUCCESS' };
        } catch (error) {
            if (error instanceof z.ZodError) {

                const fieldErrors = error.flatten().fieldErrors;
                setErrors(fieldErrors);

                // Provide user feedback
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

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);

            // Set only one image in the state
            setImage(file);
        }
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
                        id="destination"
                        name="destination"
                        required
                        label="Destination"
                        variant="filled"
                    />
                    {errors.destination && <p className="text-red-500">{errors.destination}</p>}
                </div>

                <div>
                    <Box sx={{ width: 600 }} margin="0 auto" display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Select Date"
                            type="date"
                            value={date}
                            name='date'
                            id='date'
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
                                id='images'
                                name='images'
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
                                    id='images'
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
                <Box maxWidth={600}>
                    <div data-color-mode="light" className='w-[50vw]'>
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
                </Box>

            </div>
            <Button
                type="submit"
                sx={{ mt: 2 }}
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

export default PostForm;
