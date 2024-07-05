export const Base_Url = "https://credapi.hitechhealth.us/api/";
export const Image_Base_Url = "https://credapi.hitechhealth.us/assets";

export const urls = {
  logins: {
    signup: "SignIn/ProviderSignUp",
    login: "SignIn/SignIn",
    forgotPassword: "Forgotpassword/ForgotPassword",
    changePassword: "Forgotpassword/ResetPassword",
    getCreateUserInfo: "Settings/GetUserInfo",
  },
  masters: {
    save: "Settings/SaveUpdateGlobalMaster",
    getList: "Settings/GetAllGlobalMaster",
    status: "Settings/UpdateGlobalMasterStatus",
  },

  rolemaster: {
    save: "Settings/SaveUpdateRoles",
    getList: "Settings/GetAllRoles",
  },

  dashboard: {},
  facility: {},
  doctor: {
    getLocationsById: "Provider/GetFacilityLocationsByUser",
  },

  alliedHealth: {},
  applicationBuilder: {
    saveFrom: "Forms/SaveUpdateForms",
    getallForm: "Forms/GetAllForms",
    saveTemplate: "Forms/SaveUpdateFormPackage",
    getAllTemplate: "Forms/GetAllFormPackage",
    sortingForms: "Forms/FormMapping",
    credentialingSave: "Forms/SaveCredentialPreferences",
    getAllCredTemplates: "Forms/GetAllCredentialPreferences",
    applicationTemplateStatus: "Forms/TemplateStatus",
    applicationTemplateFormsStatus: "Forms/UpdateFormStatus",
    duplicateApplicationTemplate: "/Forms/DuplicateTemplate",
    templateFormDuplicates: "Forms/DuplicateForms",
  },
  settings: {
    getStatesdd: "Home/BindDropdown",
    createUser: "Settings/CreateUser",
    getAllUsers: "Settings/GetAllUsers",
    sendPassword: "Settings/SendEmail",
    deleteUser: "Settings/DeleteUsers",
    createFacilityLocation: "Facility/SaveUpdateFacilities",
    getAllFacilityLocation: "Facility/GetAllFacilities",
    configaration: "/Settings/Configuration",
    getAllconfiguration: "/Settings/GetConfiguration",
    facilityManagementSave: "Organization/SaveUpdateOrganization",
    facilityManagementAll: "Organization/GetAllOrganization",
    statusFacilitManagement: "Organization/UpdateOrganizationStatus",
    getRolesList: "Settings/GetUsersByRole",
    saveLog:"Settings/UpdateBasicInfo",
  },
  activityLogs: {
    getAuditLogList: "Settings/GetAuditLog",
  },
  account: {
    changePassword: "Forgotpassword/UpdateAccount",
  },
  Appointments: {
    initialcreateAppointment: "",
    specialityByTemplate: "Appointment/GetTemplateFormsBySpeciality",
    createProvider: "SignIn/SaveProvider",
    createTags: "Settings/SaveUpdateTags",
    getUserTemplates: "Appointment/GetApplicationPacket",
    sendmailtoprovider: "Appointment/SendEmailToProvider",
    getUsersBySearch: "Appointment/GetUsersBySearch",
    saveAppointment: "Appointment/SaveUpdateAppointments",
    getAllAppointment: "Appointment/GetAllAppointments",
    getLicenseCertifications: "UserFormData/GetCertifications",
    getHealthDocuments: "UserFormData/GetHealthDocuments",
  },
  applicationInprogress: {
    createDeligate: "/Settings/AssignDelegate",
  },
  needAttentions: {},
  forms: {
    getformNames: "Appointment/GetReviewApplication",
    saveformdata: "SaveForms/SaveUserFormData",
    getformsdata: "SaveForms/GetUserFormData",
    saveUpload: "SaveForms/SaveFormUploads",
    getuploadForms: "SaveForms/GetUploadedFiles",
    deleteuploads: "SaveForms/DeleteFile",
    getHDList:"Forms/GetFormsAdditionalData",
    savehealthdoc:"SaveForms/SaveUserDocumentData",
    gethealthdoc:"SaveForms/GetUserDocumentData",
    saveAdditonalDoc:"SaveForms/SaveFormUploads",
    getAdditionalDoc:"SaveForms/GetFormUploads",
    updateBasicInfo:"Settings/UpdateBasicInfo",
    saveCertifications:"SaveForms/SaveCredentials",
    getAllCertificates:"SaveForms/GetUserDocumentDataCredentials",
    getDirectorsSummary:"SaveForms/GetViewSummary",
    saveDirectorsSig:"BoardSummary/RequestSignature",
    getRequestMessageForm:"Provider/GetAllNeedAttention",
    saveLogForms:"UserFormData/SaveLog",
    SaveBoardSummary:"BoardSummary/SaveBoardSummary",
    GetAllBoardSummary:"BoardSummary/GetAllBoardSummary",
    peerReferenceSentRequest:"Appointment/SendEmailToPeer",
    getPeerReferenceSentRequest:"SaveForms/GetPeerReference",
    savePeerQuestinary:"SaveForms/SavePeerReferenceData"
  },
  providerDashboard: {
    getFacilityList: "Facility/GetMyFacilities",
  },
  sendMessage: {
    saveMessage: "Provider/SaveNeedAttention",
    getMessage: "Provider/GetAllNeedAttention",
  },
  accessLevel:{
    getallLink:"Access/GetAccessLinks"
  }
};
