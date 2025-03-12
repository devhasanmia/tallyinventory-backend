import { z } from "zod";

const create = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }),
});


const update = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).optional(),
});


export const categoryValidationSchema = {
    create,
    update
}


