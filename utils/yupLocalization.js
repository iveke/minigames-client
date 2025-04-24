import * as yup from 'yup';
import { setLocale } from 'yup';

export const configureYup = (i18n) => {
    setLocale({
        mixed: {
            required: ({ path }) => i18n.t('validation.required', { field: i18n.t(`field.${path}`) }),
        },
        string: {
            email: ({ path }) => i18n.t('validation.email', { field: i18n.t(`field.${path}`) }),
            min: ({ path, min }) => i18n.t('validation.min', { field: i18n.t(`field.${path}`), length: min }),
            max: ({ path, max }) => i18n.t('validation.max', { field: i18n.t(`field.${path}`), length: max }),
        },
    });

    return yup;
};