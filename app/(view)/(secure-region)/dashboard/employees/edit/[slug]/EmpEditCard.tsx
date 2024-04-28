"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomBreadcrumb } from "@/components/buttons/CustomBreadcrumb";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/helpers/fetcher";
import Loading from "@/app/(view)/(secure-region)/loading";

const courses = [
  {
    id: "MCA",
    label: "MCA",
  },
  {
    id: "BCA",
    label: "BCA",
  },
  {
    id: "BSC",
    label: "BSC",
  },
] as const;

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png"];

const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is Required" }),
  email: z
    .string()
    .email({ message: "Invalid email format." })
    .min(1, { message: "Email is Required" }),
  mobile: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Mobile number must be a 10-digit number.",
  }),
  gender: z.enum(["male", "female"], {
    required_error: "You need to select a gender type.",
  }),
  designation: z.string({
    required_error: "Please select a Designation.",
  }),

  courses: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  image: z
    .any()
    .optional()
    .refine(
      (files) =>{
        ( files?.[0]?.length) == 0?true:(files?.[0]?.size <= MAX_FILE_SIZE?true:false),
      "Max file size is 5MB"
    ).refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, and .png files are accepted."
    )
    .refine((files) => {
      // Apply validation only if files (image) are provided
      if (typeof files[0] == "undefined") {
        return true;
      } else {
        if (!Array.isArray(files)) return false; // Must be an array
        if (files.length !== 1) return false; // Must have exactly one file
        const file = files[0];
        if (!file || typeof file !== "object") return false; // File must be an object
        if (file.size > MAX_FILE_SIZE) return false; // Check file size
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false; // Check file type
      } // If no files, validation passes
    }, "Only JPG and PNG below 5mb images are allowed."), // Custom error message for validation failure
});

async function editEmployee(data: any, id: string, imageName: string) {
  console.log("I am editEmployee");
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.mobile);
  formData.append("gender", data.gender);
  formData.append("designation", data.designation);
  formData.append("courses", JSON.stringify(data.courses));

  // Append image if present
  if (data.image[0]) {
    formData.append("image", data.image[0]);
  } else {
    formData.append("image", imageName);
  }

  try {
    const res = await fetch(`/api/v1/employees/authorised/${id}`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    throw new Error(`Error creating employee`);
  }
}

export default function EmpEditCard({ empData }: { empData: any }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: empData.name,
      email: empData.email,
      mobile: empData.mobile,
      gender: empData.gender,
      designation: empData.designation,
      courses: empData.courses,
    },
  });
  const fileRef = form.register("image");
  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
      setSelectedImage(imageUrl);
    } else {
      setSelectedImage(null); // Reset if no file is chosen
    }
  };
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(" iam onSubmit");
    setIsSubmitted(true);
    try {
      console.log("Submitting form with data:", data); // Check form data
      const response = await editEmployee(data, empData._id, empData.image);
      console.log("responseee", response);
      if (response.success) {
        setIsSubmitted(false);
        toast.success("Successfully updated employee");

        router.refresh();
      } else {
        setIsSubmitted(false);
        console.log(response);
        toast.error(response.message || "Failed to updatae employee");
      }
    } catch (error) {
      setIsSubmitted(false);
      toast.error("Error updating employee");
      console.error("Error updating employee:", error);
    }
  }
  return (
    <section>
      <div className={`flex justify-between items-center gap-4 p-2`}>
        <div>
          <CustomBreadcrumb
            firstBread={{ link: "/", name: "Home" }}
            breads={[{ link: "/dashoard", name: "Dashboard" }]}
            lastBreadName="Edit Employee"
          />
        </div>
        <h1 className="text-black text-2xl font-semibold p-4">Edit Employee</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border shadow border-blue-500"
        >
          <div className="w-full grid sm:grid-cols-2 gap-4 gap-x-20 px-20 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl className="relative">
                    <Input
                      className="focus-visible:ring-gray-500"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl className="relative">
                    <Input
                      className="focus-visible:ring-gray-500"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>

                  <FormControl className="relative">
                    <Input
                      className="focus-visible:ring-gray-500"
                      placeholder="Mobile Number"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex  space-x-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Designation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="hr">HR</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courses"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Courses</FormLabel>
                  </div>
                  {courses.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="courses"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          placeholder="image"
                          accept="image/*"
                          {...fileRef}
                          onChange={(event) => {
                            handleImageChange(event);
                            field.onChange(event); // Trigger form validation
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {selectedImage ? (
                <div>
                  <Image
                    src={selectedImage}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="object-cover border  w-[100px] h-[80px]"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src={`/uploads/employees/${empData.image}`}
                    width={500}
                    height={500}
                    alt="Picture of the author"
                    className="object-cover border  w-[100px] h-[80px]"
                  />
                </div>
              )}
            </div>
            <div className={`flex justify-center items-center mt-10`}>
              <LoadingButton
                type="submit"
                className="w-[300px] mx-auto "
                isLoading={isSubmitted}
              >
                Submit
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
