"use client";
import { useEffect, useState } from 'react';

import TextInput from "@/app/components/v1/TextInput";
import RadioInput from "@/app/components/v1/RadioInput";
import ColoredBox from "@/app/components/v1/ColoredBox";
import Button from "@/app/components/v1/Button";
import LikertSimple from "@/app/components/v1/LikertSimple";
import Slider from "@/app/components/v1/Slider";
import Text from "@/app/components/v1/Text";
import Title from "@/app/components/v1/Title";
import WhiteBox from "@/app/components/v1/WhiteBox";
import CheckboxInput from "@/app/components/v1/CheckboxInput";
import { useRouter, useSearchParams } from "next/navigation";
import { getPID } from '@/lib/v1/urlParams';
import { findDemographicByPIDs, updateDemographic } from '@/lib/v1/api/demographic';
import { set } from 'mongoose';
import Loading from '@/app/components/v1/Loading';
import { demographicsOptions } from '@/lib/v1/demographics/options';
import { createUserProfileD } from '@/lib/v1/userProfile/userProfileD';
import { updateUserProfile } from '@/lib/v1/api/userProfile';
import { error } from 'console';
import { findParticipantsByPIDs } from '@/lib/v1/api/participant';

export default function Page() {
    const router = useRouter();
    const query = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({} as any);
    const [pID, setPID] = useState("");
    const [condition, setCondition] = useState("W1");

    const [checkboxRequired, setCheckboxRequired] = useState({
        "ethnicOrigins": false,
        "raceIdentity": false,
        "disability": false,
        "livingWith": false,
    });

    useEffect(() => {
        const loadData = async () => {
            let _pID = getPID(query);
            setPID(_pID);
            try {
                const apiResult = await findDemographicByPIDs([_pID]);
                if (apiResult.result !== 'success') {
                    throw new Error('Error finding demographic data by pID');
                }
                setFormData(apiResult.demographics[0]);
                const res_findParticipantByPID = await findParticipantsByPIDs([_pID]);
                if (res_findParticipantByPID.result !== 'success') {
                    throw new Error('Error finding participant by pID');
                }
                setCondition(res_findParticipantByPID.participants[0].condition);
            } catch (e) {
                alert(e)
            }
            finally {
                setLoading(false);
            }

        }
        loadData();
    }, [query]);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        if (checkEmptyCheckboxes()) {
            alert('Please select at least one option for each question.');
            return;
        }
        setLoading(true);
        const apiResult = await updateDemographic(pID, formData);
        if (apiResult.result === 'success') {
            const userProfile = createUserProfileD(formData);
            const upApiResult = await updateUserProfile(pID, "D", userProfile);
            if (upApiResult.result === 'success') {
                if (condition === "W2") {
                    router.push(`/v1/E/WYR?pID=${pID}`);
                } else {
                    router.push(`/v1/E/spi?pID=${pID}`);
                }

            } else {
                setLoading(false);
                alert('Error submitting userProfile. Please try again.');
            }
        } else {
            setLoading(false);
            alert('Error submitting survey. Please try again.');
        }
    }

    const onChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
        //console.log(key, value);
    }
    const onCheckboxChange = (key: string, value: string[]) => {
        setFormData({ ...formData, [key]: value });
        //console.log(key, value);
    }
    const checkEmptyCheckboxes = () => {
        let empty = false;
        let newCheckboxRequired = {} as any;
        for (let key in checkboxRequired) {
            if (formData[key].length === 0) {
                empty = true;
            }
            newCheckboxRequired[key] = formData[key].length === 0;

        }
        setCheckboxRequired(newCheckboxRequired);
        return empty;
    }

    return (
        <>
            {loading && <Loading />}
            <form className="flex flex-col gap-6 w-full justify-start h-auto mx-auto mb-40" onSubmit={onSubmit}>
                <ColoredBox>
                    In this section, questions about your demographic details will be asked. Please choose the option that best describes your demographic characteristics.
                </ColoredBox>

                {/* 1 */}
                <TextInput label="1. What is your current age?" name="age" required={true} onChange={onChange} value={formData?.age} />

                {/* 2 */}
                <RadioInput
                    question="2. How was your sex assigned at birth? "
                    name="sexAssignedAtBirth"
                    options={demographicsOptions.sexAssignedAtBirth}
                    onChange={onChange}
                    valueLoaded={formData?.sexAssignedAtBirth}
                />

                {/* 3 */}
                <RadioInput
                    question="3. Which gender most closely identifies with you?"
                    name="genderIdentity"
                    options={demographicsOptions.genderIdentity}
                    additionalName="additionalGender"
                    onChange={onChange}
                    valueLoaded={formData?.genderIdentity}
                    additionalValue={formData?.additionalGender}
                />

                {/* 4 */}
                <RadioInput
                    question="4. What do you consider to be your sexual orientation?"
                    name="sexualOrientation"
                    options={demographicsOptions.sexualOrientation}
                    additionalName="additionalsexualOrientation"
                    onChange={onChange}
                    valueLoaded={formData?.sexualOrientation}
                    additionalValue={formData?.additionalsexualOrientation}
                />

                {/* 5 */}
                <CheckboxInput
                    question="5. What are your ethnic origins or ancestry? Please select ALL geographic areas from which your family’s ancestors first originated"
                    name="ethnicOrigins"
                    options={demographicsOptions.ethnicOrigins}
                    onChange={onCheckboxChange}
                    unchecked={checkboxRequired.ethnicOrigins}
                    valueLoaded={formData?.ethnicOrigins}
                />

                {/* 6 */}
                <CheckboxInput
                    question="6. How would you identify yourself in terms of race? Please select ALL the groups that apply to you."
                    name="raceIdentity"
                    options={demographicsOptions.raceIdentity}
                    onChange={onCheckboxChange}
                    unchecked={checkboxRequired.raceIdentity}
                    valueLoaded={formData?.raceIdentity}
                />

                {/* 7 */}
                <CheckboxInput
                    question="7. Do you have a disability? Please select ALL that apply to you."
                    name="disability"
                    options={demographicsOptions.disability}
                    onChange={onCheckboxChange}
                    unchecked={checkboxRequired.disability}
                    valueLoaded={formData?.disability}
                    disability={true}
                />

                {/* 7-1 */}
                {formData?.disability
                    && (!formData?.disability.includes("I do not have a disability or impairment")
                        && formData?.disability.length > 0)
                    && (<RadioInput
                        question="7-1. How much does your disability affect your daily life?"
                        name="disabilityImpact"
                        options={demographicsOptions.disabilityImpact}
                        onChange={onChange}
                        valueLoaded={formData?.disabilityImpact}
                    />)}

                {/* 8 */}
                <RadioInput
                    question="8. What country were you born in?"
                    name="country"
                    options={demographicsOptions.country}
                    additionalName="additionalCountry"
                    onChange={onChange}
                    valueLoaded={formData?.country}
                    additionalValue={formData?.additionalCountry}
                />

                {/* 9 */}
                <RadioInput
                    question="9. Do you have a dual nationality?"
                    name="dualNationality"
                    options={demographicsOptions.dualNationality}
                    onChange={onChange}
                    valueLoaded={formData?.dualNationality}
                />
                {/* 9-1 */}
                {formData?.dualNationality === "Yes" && (
                    <>
                        <div>9-1. If you have a dual nationality, please indicate which nationality holds greater importance to you.</div>
                        <TextInput name="dualNationalityGreaterImportance" required={true} onChange={onChange} value={formData?.dualNationalityGreaterImportance} />
                    </>

                )}

                {/* 10 */}
                <div>
                    10. Where do you currently live? If you live in the United States, please write your City / State.
                </div>
                <TextInput name="city" label="City" required={true} onChange={onChange} value={formData?.city} />
                <TextInput name="states" label="States" required={true} onChange={onChange} value={formData?.states} />

                {/* 11 */}
                <RadioInput
                    question="11. What is your highest level of education?"
                    name="educationLevel"
                    options={demographicsOptions.educationLevel}
                    onChange={onChange}
                    valueLoaded={formData?.educationLevel}
                />

                {/* 12 */}
                <RadioInput
                    question="12.  What is your employment status?"
                    name="employmentStatus"
                    options={demographicsOptions.employmentStatus}
                    onChange={onChange}
                    valueLoaded={formData?.employmentStatus}
                />

                {/* 12-1 */}
                {formData?.employmentStatus?.includes("Student") && (
                    <TextInput name="major" label="12-1. What is your major?" required={true} onChange={onChange} value={formData?.major} />
                )}

                {/* 12-2 */}
                {
                    demographicsOptions.employmentStatus.slice(0, 4).includes(formData?.employmentStatus) && (
                        <TextInput name="jobResponsibilities" label="12-2. Please describe your main job responsibilities" required={true} onChange={onChange} value={formData?.jobResponsibilities} />
                    )
                }

                {/* 13 */}
                <RadioInput
                    question="13. What is your annual household income?"
                    name="householdIncome"
                    options={demographicsOptions.householdIncome}
                    onChange={onChange}
                    valueLoaded={formData?.householdIncome}
                />

                {/* 14 */}
                <RadioInput
                    question="14. Compared with American families in general, would you say your family income is far below average, below average, above average, or far above average? It is okay to make your best guess."
                    name="familyIncome"
                    options={demographicsOptions.familyIncome}
                    onChange={onChange}
                    valueLoaded={formData?.familyIncome}
                />

                {/* 15 */}
                <RadioInput
                    question="15. How satisfied are you with your current financial situation?"
                    name="financialSituation"
                    options={demographicsOptions.financialSituation}
                    onChange={onChange}
                    valueLoaded={formData?.financialSituation}
                />

                {/* 16 */}
                <RadioInput
                    question="If you were asked to choose one of four names for your social class, which would you say you belong to: the lower class, the working class, the middle class, or the upper class?"
                    name="socialClass"
                    options={demographicsOptions.socialClass}
                    onChange={onChange}
                    valueLoaded={formData?.socialClass}
                />

                {/* 17 */}
                <CheckboxInput
                    question="17. Who are you currently living with? Please select all that apply"
                    name="livingWith"
                    options={demographicsOptions.livingWith}
                    onChange={onCheckboxChange}
                    unchecked={checkboxRequired.livingWith}
                    valueLoaded={formData?.livingWith}
                />

                {/* 18 */}
                <RadioInput
                    question="Political discussions frequently mention liberal and conservative viewpoints. On a five-point scale representing political views that people might hold, where would you place yourself?"
                    name="politicalViews"
                    options={demographicsOptions.politicalViews}
                    onChange={onChange}
                    valueLoaded={formData?.politicalViews}
                />

                {/* 19 */}
                <RadioInput
                    question="19. What is your religious preference?"
                    name="religiousPreference"
                    options={demographicsOptions.religiousPreference}
                    onChange={onChange}
                    valueLoaded={formData?.religiousPreference}
                />

                <div className="flex flex-col items-center my-20">
                    <Button label="Next" />
                </div>
            </form>
        </>
    );
}