import { FC } from "react";
import useEmployeeSelection from "hooks/useEmployeeSelection";
import useBrightHrApi from "hooks/useBrightHrApi";
import AbsencesTable from "components/AbsencesTable";
import Modal from ".";

const IndavidualAbsencesModal: FC = () => {
  const { conflicts } = useBrightHrApi();
  const {
    selectedEmployeeId,
    selectedEmployeeAbsences,
    setSelectedEmployeeId,
  } = useEmployeeSelection();

  return (
    <Modal
      open={selectedEmployeeId !== undefined}
      onClose={() => setSelectedEmployeeId(undefined)}
    >
      <div className="modal__content">
        <AbsencesTable
          absences={selectedEmployeeAbsences}
          conflicts={conflicts}
        />
      </div>
    </Modal>
  );
};

export default IndavidualAbsencesModal;
