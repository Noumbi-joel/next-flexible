import { Modal, ProjectForm } from "@/components";
import { getCurrentUser } from "@/lib/session";

export default async function CreateProject() {
  const session = await getCurrentUser();
  return (
    <Modal>
      <h3>Create a New Project</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  );
}
