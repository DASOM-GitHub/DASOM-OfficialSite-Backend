import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './schema/form.schema';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import * as AutoIncrementFactory from 'mongoose-sequence';


@Module({
    imports: [MongooseModule.forFeatureAsync([
            {
            name: Form.name,
            useFactory: async (connection) => {
                const schema = FormSchema;
                const AutoIncrement = AutoIncrementFactory(connection);
                schema.plugin(AutoIncrement, { inc_field: 'formId' });
                return schema;
            },
            inject: [getConnectionToken()],
            },
        ]),
    ],
    controllers: [FormController],
    providers: [FormService],
})

export class FormModule {}
