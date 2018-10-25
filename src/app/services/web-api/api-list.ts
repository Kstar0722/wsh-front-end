
import * as envJson from '../../../config/env.json';
const API_PATH = envJson.default.api_path;
export const API_LIST = {
    jackpotsList: API_PATH + '/api/v2/jackpots', // /{currency}
    jackpotsSum: API_PATH + '/api/v2/jackpots-sum', // /{currency}
    plansPricing: (typeSlug, currency) => {
        const acq = !!(<any>window).gtmTrackedCampaignName ? (<any>window).gtmTrackedCampaignName : '';
        return API_PATH + '/api/v2/packages-set/' + typeSlug + '/' + currency + '?acquisition_campaign=' + acq;
    },

    login: API_PATH + '/api/v2/session',
    loginExternal: (token) => {
      return API_PATH + '/api/v2/login-token/' + token + '/session';
    },
    loginRemote: (type: string) => {
      return API_PATH + '/api/v2/remote-login/' + type;
    },
    passwordRecovery: API_PATH + '/api/v2/password-recovery-process',
    passwordRecoveryInfo: (key) => {
      return API_PATH + '/api/v2/password-recovery-process/' + key;
    },
    passwordChange: (key) => {
      return API_PATH + '/api/v2/password-recovery-process/' + key + '/user';
    },
    passwordUpdate: API_PATH + '/api/v2/user/current/password',
    currentSessionData: API_PATH + '/api/v2/session/current',
    registration: API_PATH + '/api/v2/users',
    updateCurrentUser: (type: string) => {
        switch (type) {
            case 'regular':
                return API_PATH + '/api/v2/users/current';
            case 'social':
                return  API_PATH + '/api/v2/users/current/social';
            default:
                throw new Error('updateCurrentUser type must be "regular" or "social". Current type used:' + type);
        }
    },
    getAvailableNotifications: API_PATH + '/api/v2/notification-types',
    updateNotifications: API_PATH + '/api/v2/user/current/notifications',
    balanceHistory: (offset: number, limit: number) => {
      return API_PATH + '/api/v2/user/current/balance-history?offset=' + offset + '&limit=' + limit;
    },

    withdraw: API_PATH + '/api/v2/user/current/withdrawal',
    packageFromTID: (tid: string) => {
      return API_PATH + '/api/v2/payment/' + tid + '/package';
    },
    makePayment: (packagePriceId: string, returnpath: string) => {
        return API_PATH + '/api/v2/user/current/package-price/' + packagePriceId + '/payment?returnpath=' + returnpath + '/_TID_';
    },
    singlePaymentStatus: (tid: string) => {
      return API_PATH + '/api/v2/user/current/detailed-payment/' + tid;
    },
    paymentHistory: API_PATH + '/api/v2/user/current/payments',
    changeCardPayment: (returnPath: string) => {
      return API_PATH + '/api/v2/user/current/recent-subscription/payment?returnpath=' + returnPath + '/_TID_?cardrenewal=1';
    },

    getReferrals: API_PATH + '/api/v2/user/current/referrals',
    remindReferral: (id) => {
      return API_PATH + '/api/v2/referral/' + id + '/reminder';
    },
    banners: API_PATH + '/api/v2/referral-banners',
    getBonusesList: API_PATH + '/api/v2/user/current/bonuses',

    countries: API_PATH + '/api/v2/countries',
    statistics: API_PATH + '/api/v2/statistics',

    allLotteriesResults: (
      include_historical: boolean, include_upcoming: boolean, offset: number, limit: number, for_current_user: boolean
    ) => {
        return API_PATH + '/api/v2/draws?include_historical='
        + include_historical + '&include_upcoming='
        + include_upcoming + '&offset=' + offset + '&limit='
        + limit + '&only_for_current_user=' + for_current_user;
    },
    lotteriesResultsGroups: (offset: number, limit: number) => {
        return API_PATH + '/api/v2/draw-groups?offset=' + offset + '&limit=' + limit;
    },
    ticketList: (drawId, include_historical, include_upcoming, offset?, limit?) => {
        let concatenate = '';
        if (offset !== undefined) {
            concatenate += '&offset=' + offset;
        }
        if (limit !== undefined) {
            concatenate += '&limit=' + limit;
        }
        return API_PATH + '/api/v2/user/current/tickets?draw_id%5B%5D=' +
        drawId + '&include_historical=' + include_historical +
        '&include_upcoming=' + include_upcoming + concatenate;
    },
    ticketFromLineResult: (id) => {
      return API_PATH + '/api/v2/line-result/' + id + '/ticket';
    },

    validateVoucher: (planId, voucherCode) => {
        return API_PATH + '/api/v2/voucher/' + voucherCode + '/plan/' + planId;
    },

    getCurrentSubscriptionPackage: API_PATH + '/api/v2/user/current/recent-subscription/package',
    updateSubscriptionData: API_PATH + '/api/v2/user/current/subscription/0',
    memberships: API_PATH + '/api/v2/user/current/memberships',
    smsUnsubscribe: API_PATH + '/api/v2/sms-unsubscription',
    getrenewal: API_PATH + '/api/v2/user/extra-renewals',
    cancelrenewal: API_PATH + '/api/v2/user/extra-renewal',

    getStaticContent: (slug) => {
      return API_PATH + '/api/v2/static-content/' + slug;
    },
    getSubscriptionsSummary: () => {
        return API_PATH + '/api/v2/user/current/subscriptions-summary';
    },

    contactMessage: () => {
      return API_PATH + '/api/v2/contact-message';
    }
};
