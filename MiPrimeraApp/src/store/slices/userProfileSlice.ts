import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "../../utils/types/Skincare";

const defaultUserProfile: UserProfile = {
    name: "",
    age: "",
    skinType: "normal",
    medicalConditions: [],
    dermatologicalTreatments: []
};

const userProfileSlice = createSlice ({
    name: "userProfile",
    initialState: defaultUserProfile, 
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
            Object.assign(state, action.payload);
        },
        addMedicalCondition: (state, action: PayloadAction<string> ) => {
            const trimmed = action.payload.trim();
            if (!trimmed || state.medicalConditions.includes(trimmed)) return;
            state.medicalConditions.push(trimmed);
        },
        removeMedicalCondition: (state, action: PayloadAction<string>)=>{
            state.medicalConditions = state.medicalConditions.filter(
                (mc) => mc !== action.payload
            );
        },
        addTreatment: (state, action: PayloadAction<string>)=>{
            const trimmed = action.payload.trim();
            if (!trimmed || state.dermatologicalTreatments.includes(trimmed)) return; 
            state.dermatologicalTreatments.push(trimmed);
        },
        removeTreatment: (state, action: PayloadAction<string>)=>{
            state.dermatologicalTreatments = state.dermatologicalTreatments.filter(
                (dt) => dt !== action.payload
            );
        },
    },
});

export const {
updateProfile,
addMedicalCondition,
removeMedicalCondition,
addTreatment,
removeTreatment
} = userProfileSlice.actions;

export default userProfileSlice.reducer;