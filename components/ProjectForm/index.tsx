"use client";

import { ProjectInterface, SessionInterface } from "@/types";
import React from "react";
import Image from "next/image";
import { Button, CustomMenu, FormField } from "..";
import { categoryFilters } from "@/constants";
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

function ProjectForm({ type, session, project }: Props) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  const [form, setForm] = React.useState({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    githubUrl: project?.githubUrl || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    category: project?.category || "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token).then(() => {
          router.push("/");
        });
      }

      if (type === "edit") {
        await updateProject(form, project?.id!, token).then(() => {
          router.push("/");
        });
      }
    } catch (err: any) {
      console.log("Error while creating project: " + JSON.stringify(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes("image"))
      return alert("Please upload an image file");

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />

        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Next Flexible"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects"
        setState={(value) => handleStateChange("description", value)}
      />
      <FormField
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://nkjy.vercel.app"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />
      <FormField
        title="Github URL"
        state={form.githubUrl}
        placeholder="https://github.com/Noumbi-joel"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating..." : "Editing..."}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
          handleClick={() => {}}
        />
      </div>
    </form>
  );
}

export default ProjectForm;
