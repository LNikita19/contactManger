import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    Grid,
    CircularProgress
} from '@mui/material';

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
    address: yup.string(),
    favourite: yup.boolean(),
});

const ContactForm = ({ defaultValues, onSubmit, onCancel, isSubmitting }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        {...register('name')}
                        label="Name"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        {...register('email')}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        {...register('phone')}
                        label="Phone"
                        fullWidth
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        {...register('address')}
                        label="Address"
                        multiline
                        minRows={1}
                        fullWidth
                        sx={{
                            '& .MuiInputBase-root': {
                                minHeight: '56px',
                                alignItems: 'flex-start',  // Align text to top
                            },
                            '& textarea': {
                                paddingTop: '16.5px',
                                paddingBottom: '16.5px',
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox {...register('favourite')} />}
                        label="Mark as favorite"
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={onCancel} variant="outlined">
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ContactForm;