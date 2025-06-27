'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/components/v1/Loading';
import { updateParticipant } from '@/lib/v1/api/participant';
import { defaultCondition, getPID } from '@/lib/v1/urlParams';
export default function Page() {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const query = useSearchParams();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    let condition = query.get('cond') as string;
    if (!condition) {
      condition = defaultCondition
    }
    // let consent = checked;
    // const apiResult = await updateParticipant(pID, { consent });
    router.push(`/v1/A/prolificID?cond=${condition}`);
    // if (apiResult.result === 'success') {
    //   router.push(`/v1/B/instruction?pID=${pID}`);
    // } else {
    //   setLoading(false);
    //   alert('Error creating participant. Please try again.');
    // }
  };

  const onChangeAgree = () => {
    setChecked(true);
  };

  const onChangeDisagree = () => {
    setChecked(false);
  };
  return (
    <>
      {loading && <Loading />}
      <div className="flex flex-col p-4">
        <div className="bg-gray-100 p-8 my-4">
          <div className="mb-4 flex justify-center">
            <b>Consent Form</b>
          </div>
          <div className="mb-4">
            Title of the research: Research on development of generative
            AI-based digital doppelganger and communication process with
            doppelganger
          </div>
          <div className="mb-12">
            Principal Investigator: Eun-mee Kim (
            <i>Professor, Department of Communication</i>)
          </div>
          <div>
            <ol className="list-decimal pl-12 mb-12">
              <li className="mb-4">
                I have carefully read and discussed the above instructions with
                the researcher.
              </li>
              <li className="mb-4">
                I have been informed about the potential risks and benefits of
                participating in the research, and I have had all my questions
                answered satisfactorily.
              </li>
              <li className="mb-4">
                I agree to participate in the research voluntarily.
              </li>
              <li className="mb-4">
                I agree to the collection and use of my personal data for the
                research, as per existing laws and the Institutional Review
                Board&rsquo;s guidelines.
              </li>
              <li className="mb-4">
                I allow my personal information, securely held by the
                researchers, to be accessed by legal and regulatory bodies,
                including the SNU Institutional Review Board, for oversight
                purposes.
              </li>
              <li className="mb-4">
                I understand that I can withdraw from the research at any time
                without any detriment to myself.
              </li>
            </ol>
            <div className="flex justify-center">
              Do you agree to participate in this study?
            </div>
            <form
              className="flex flex-col items-center my-4"
              onSubmit={onSubmit}
            >
              <div className="mb-8 flex  justify-center items-center">
                <div>
                  <input
                    type="radio"
                    id="consent"
                    name="consent"
                    value="consent"
                    onChange={onChangeAgree}
                  />
                  <label htmlFor="consent" className="pl-2">
                    Agree
                  </label>
                </div>
                <div className="ml-8">
                  <input
                    type="radio"
                    id="noConsent"
                    name="consent"
                    value="noConsent"
                    onChange={onChangeDisagree}
                  />
                  <label htmlFor="noConsent" className="pl-2">
                    Disagree
                  </label>
                </div>
              </div>

              {checked ? (
                <input
                  type="submit"
                  value="SUBMIT"
                  className="w-60 p-4 flex justify-center border-2 border-gray-400 hover:bg-gray-200 cursor-pointer rounded"
                />
              ) : (
                <input
                  type="submit"
                  value="SUBMIT"
                  className="w-60 p-4 flex justify-center border-2 border-gray-400 hover:bg-gray-200 cursor-pointer rounded opacity-50"
                  disabled
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}