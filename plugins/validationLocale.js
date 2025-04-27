// // import { configure, defineRule } from 'vee-validate';
// // import { required, email, min } from '@vee-validate/rules';
// import {localize} from "@vee-validate/i18n";
//
// import en from '@vee-validate/i18n/dist/locale/en.json';
// import uk from '@vee-validate/i18n/dist/locale/uk.json';
// import enLocale from '~/i18n/locales/en.json'
// import ukLocale from '~/i18n/locales/uk.json'
//
// import {configure, defineRule} from 'vee-validate';
// // import {required, email, min, max, regex} from '@vee-validate/rules';
//
// export default defineNuxtPlugin((nuxtApp) => {
//     //
//     // configure({
//     //     generateMessage: ctx => {
//     //         const { field, rule } = ctx;
//     //         const messages = nuxtApp.$i18n.t('validation');
//     //         let message = messages[rule.name] || `Invalid ${field}`;
//     //         message = message.replace('{field}', field);
//     //         if (rule.params?.length) {
//     //             message = message.replace('{length}', rule.params.length);
//     //         }
//     //     }
//     //
//     // })
//     // const {locale} = nuxtApp.$i18n;
//     // localize(locale.value);
//     //
//     // // Синхронізація локалі VeeValidate з i18n
//     // nuxtApp.$i18n.onLanguageSwitched = (newLocale) => {
//     //     localize(newLocale);
//     // };
//
// });