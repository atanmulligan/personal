"use client";

import Button from "@/app/components/v1/Button";
import Loading from "@/app/components/v1/Loading";
import Text from "@/app/components/v1/Text";
import ToggleButton from "@/app/components/v1/ToggleButton";
import { findParticipantsByPIDs } from "@/lib/v1/api/participant";
import { findOneTst, findTstsByPIDs, formatTST, generateTst, getTSTItems, updateTst } from "@/lib/v1/api/tst";
import { getPID } from "@/lib/v1/urlParams";
import { getTSTPromptsW1, getTSTPromptsW2 } from "@/lib/v1/userProfile/tst";
import { set } from "mongoose";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type TSTItem = {
  text: string;
  checked: boolean;
  selfType: string;
  condition: string;
}

export default function Page() {
  const router = useRouter();
  const query = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  // const [formData, setFormData] = useState({} as any);
  const [tstList, setTstList] = useState([] as TSTItem[]);
  const [pID, setPID] = useState("");

  useEffect(() => {
    const loadData = async () => {
      let _pID = getPID(query);
      setPID(_pID);
      try {
        const result_findTST = await findOneTst(_pID);
        if (result_findTST.result !== "success") {
          throw new Error("Error finding tst data by pID");
        }
        console.log("result_findTST", result_findTST)
        const res_findParticipantByPID = await findParticipantsByPIDs([_pID]);
        if (res_findParticipantByPID.result !== "success") {
          throw new Error("Error finding participant by pID");
        }
        console.log("res_findParticipantByPID", res_findParticipantByPID);
        const condition = res_findParticipantByPID.participants[0].condition;
        console.log("condition", condition);
        if (result_findTST.tst) {
          setTstList(result_findTST.tst.tstList);
        } else { // Generate new tst data
          setLoadingMessage("Generating statements (0/24)");
          let newTSTList = [] as TSTItem[];
          if (condition === "W1") {
            const result_getTSTPromptsW1 = await getTSTPromptsW1(_pID);
            //console.log("result_getTSTPromptsW1", result_getTSTPromptsW1)
            if (result_getTSTPromptsW1.result !== "success") {
              throw new Error("Error getting tst prompts by pID");
            }

            // Generate D
            const result_genTST_D = await generateTst(result_getTSTPromptsW1.tstPrompts.D);
            //console.log("result_genTST_D", result_genTST_D)
            if (result_genTST_D.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_D = formatTST(result_genTST_D.tst);
            if (tst_D.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_D, "D")];
            setLoadingMessage("Generating statements (6/24)");

            // Generate DPV
            const result_genTST_DPV = await generateTst(result_getTSTPromptsW1.tstPrompts.DPV);
            if (result_genTST_DPV.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_DPV = formatTST(result_genTST_DPV.tst);
            if (tst_DPV.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_DPV, "DPV")];
            setLoadingMessage("Generating statements (12/24)");

            // Generate DPVC
            const result_genTST_DPVC = await generateTst(result_getTSTPromptsW1.tstPrompts.DPVC);
            if (result_genTST_DPVC.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_DPVC = formatTST(result_genTST_DPVC.tst);
            if (tst_DPVC.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_DPVC, "DPVC")];
            setLoadingMessage("Generating statements (18/24)");

            // Generate DPVCA
            const result_genTST_DPVCA = await generateTst(result_getTSTPromptsW1.tstPrompts.DPVCA);
            if (result_genTST_DPVCA.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_DPVCA = formatTST(result_genTST_DPVCA.tst);
            if (tst_DPVCA.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_DPVCA, "DPVCA")];
            //shuffle the list
            newTSTList = newTSTList.sort(() => Math.random() - 0.5);
            setTstList(newTSTList);

            const result_updateTst = await updateTst(_pID, { tstList: newTSTList });
            if (result_updateTst.result !== "success") {
              throw new Error("Error updating tst data by pID");
            }

          } else if (condition === "W2") {
            const result_getTSTPromptsW2 = await getTSTPromptsW2(_pID);
            //console.log("result_getTSTPromptsW1", result_getTSTPromptsW1)
            if (result_getTSTPromptsW2.result !== "success") {
              throw new Error("Error getting tst prompts by pID");
            }
            // Generate D
            const result_genTST_D = await generateTst(result_getTSTPromptsW2.tstPrompts.D);
            //console.log("result_genTST_D", result_genTST_D)
            if (result_genTST_D.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_D = formatTST(result_genTST_D.tst);
            if (tst_D.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_D, "D")];
            setLoadingMessage("Generating statements (6/24)");

            // Generate PV
            const result_genTST_PV = await generateTst(result_getTSTPromptsW2.tstPrompts.PV);
            if (result_genTST_PV.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_PV = formatTST(result_genTST_PV.tst);
            if (tst_PV.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_PV, "PV")];
            setLoadingMessage("Generating statements (12/24)");

            // Generate C
            const result_genTST_C = await generateTst(result_getTSTPromptsW2.tstPrompts.C);
            if (result_genTST_C.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_C = formatTST(result_genTST_C.tst);
            if (tst_C.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            newTSTList = [...newTSTList, ...getTSTItems(tst_C, "C")];
            setLoadingMessage("Generating statements (18/24)");

            // Generate DPVC
            const result_genTST_DPVC = await generateTst(result_getTSTPromptsW2.tstPrompts.DPVC);
            if (result_genTST_DPVC.result !== "success") {
              throw new Error("Error generating tst data by pID");
            }
            const tst_DPVC = formatTST(result_genTST_DPVC.tst);
            if (tst_DPVC.result !== "success") {
              throw new Error("Error formatting tst data by pID");
            }
            console.log(tst_DPVC);
            newTSTList = [...newTSTList, ...getTSTItems(tst_DPVC, "DPVC")];
            //shuffle the list
            newTSTList = newTSTList.sort(() => Math.random() - 0.5);
            console.log("newTSTList", newTSTList);
            setTstList(newTSTList);

            const result_updateTst = await updateTst(_pID, { tstList: newTSTList });
            if (result_updateTst.result !== "success") {
              throw new Error("Error updating tst data by pID");
            }
          }
        }
        //Check if tst data is exist
        //If not, create new tst data
        //If exist, load the data
      } catch (e) {
        console.error("Error loading data", e);
      }
      setLoading(false);
    }
    loadData();
  }, [query])

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const data = tstList.map((item) => {
        return { text: item.text, checked: item.checked, selfType: item.selfType, condition: item.condition }
      });
      console.log("data", data);
      const result = await updateTst(pID, { tstList: data });
      if (result.result !== "success") {
        throw new Error("Error updating tst data by pID");
      }
      router.push(`/v1/H/interview?pID=${pID}`);
    } catch (e) {
      console.error("Error submitting data", e);
    }
  }

  const onToggle = (index: number) => {
    const newTstList = [...tstList];
    newTstList[index].checked = !newTstList[index].checked;
    setTstList(newTstList);
  }

  return (
    <>
      {loading && <Loading message={loadingMessage} />}
      <form className="flex flex-col gap-6 w-full items-center justify-center h-auto mx-auto" onSubmit={onSubmit}>
        <Text content="Now, you will be shown 24 short statements that your AITwinBot has generated about your characteristics based on the information you've provided." />
        <Text content={`Please <b>select ALL that ACCURATELY reflect</b>
         aspects of yourself or your characteristics. If a statement is incorrect or not important in describing you, do not select it.`}
          html={true} />
        {tstList?.length > 0 && tstList.map((item, index) => {
          return (
            <ToggleButton key={index} content={item.text} checked={item.checked} onClick={() => onToggle(index)} />
          )
        })}
        <Button label="Next" />
      </form>
    </>

  );
}
