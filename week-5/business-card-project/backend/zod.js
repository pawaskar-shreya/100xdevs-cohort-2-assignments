import zod from 'zod';

export const createCard = zod.object({
    name : zod.string(),
    description : zod.string(),
    interests : zod.array(zod.string()), 
    socials : zod.array(
        zod.record(zod.string(), zod.string())
    )
})

export const updateCard = zod.object({
    _id : zod.string(), 
    name : zod.string().optional(),
    description : zod.string().optional(),
    interests : zod.array(zod.string()).optional(), 
    socials : zod.array(
        zod.record(zod.string(), zod.string())
    ).optional()
})

export const deleteCard = zod.object({
    _id : zod.string(), 
})