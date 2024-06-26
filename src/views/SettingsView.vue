<script setup lang="ts">
import { DEFAULT_CUSTOMER_IMAGE, VALIDATION_ERROR } from '@/shared/constants';
import { useUserStore } from '@/stores/UserStore';
import { useToast } from 'primevue/usetoast';
import { compareDatesInTime, isDate } from '@/shared/validators';
import { areDateEqualInTime, areObjectsEqual, createDateWithTime } from '@/shared/utils';
import { computed, ref, watch } from 'vue';
import { type ServerErrors, useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, requiredIf } from '@vuelidate/validators';
import { type FileUploadUploaderEvent } from 'primevue/fileupload';
import type {
  IUpdatePassword,
  IUpdateProfile,
  IUpdateWorkspace,
  ResponseError
} from '@/shared/interfaces';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import { AxiosError } from 'axios';
import { getEnvVariable } from '@shared/utils';

const userStore = useUserStore();
const toast = useToast();

const safetySettingsRules = computed(() => ({
  newPassword: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!safetySettings.value.newPassword.length)
    ),
    minLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MIN_LENGTH, minLength(8)),
    maxLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MAX_LENGTH, maxLength(32))
  },
  oldPassword: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!safetySettings.value.oldPassword.length)
    ),
    minLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MIN_LENGTH, minLength(8)),
    maxLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MAX_LENGTH, maxLength(32))
  }
}));

const $externalSafetySettingsResults = ref<ServerErrors>({
  newPassword: '',
  oldPassword: ''
});

const resetExternalSafetySettingsResultProperty = (propertyName: keyof IUpdatePassword) => {
  $externalSafetySettingsResults.value[propertyName] = '';
};

const safetySettings = ref({
  newPassword: '',
  oldPassword: ''
});

const isActiveSafetyButton = computed(() => {
  return safetySettings.value.oldPassword.length && safetySettings.value.newPassword.length;
});

const $vSafetySettings = useVuelidate(safetySettingsRules, safetySettings, {
  $externalResults: $externalSafetySettingsResults
});

const submitSafetySettingsHandler = async () => {
  if (!(await $vSafetySettings.value.$validate())) return;

  try {
    await userStore.updatePassword({ ...safetySettings.value });
    safetySettings.value.newPassword = '';
    safetySettings.value.oldPassword = '';
    toast.add({ severity: 'success', summary: 'Успешно', detail: 'Пароль обновлен', life: 3000 });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        const message = error.response?.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors: ResponseError[] = error?.response?.data?.errors as ResponseError[];

        errors?.forEach((error: ResponseError) => {
          $externalSafetySettingsResults.value[error.property] = error.message;
        });
      }
    }
  }
};

const profileSettingsRules = computed(() => ({
  lastName: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!safetySettings.value.newPassword.length)
    )
  },
  firstName: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!safetySettings.value.oldPassword.length)
    )
  },
  fatherName: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!safetySettings.value.oldPassword.length)
    )
  }
}));

let fixedProfileSettings = {
  lastName: userStore.user!.lastName,
  firstName: userStore.user!.firstName,
  fatherName: userStore.user!.fatherName
};

const profileSettings = ref<IUpdateProfile>({
  lastName: userStore.user!.lastName,
  firstName: userStore.user!.firstName,
  fatherName: userStore.user!.fatherName
});

const isActiveSettingsButton = ref(false);

watch(
  profileSettings,
  (newValue) => {
    isActiveSettingsButton.value = !areObjectsEqual(newValue, fixedProfileSettings);
  },
  { deep: true }
);

const $externalProfileSettingsResults = ref<ServerErrors>({
  lastName: '',
  firstName: '',
  fatherName: ''
});

const resetExternalProfileSettingsResultProperty = (propertyName: keyof IUpdateProfile) => {
  $externalProfileSettingsResults.value[propertyName] = '';
};

const $vProfileSettings = useVuelidate<IUpdateProfile>(profileSettingsRules, profileSettings, {
  $externalResults: $externalProfileSettingsResults
});

const submitProfileSettingsHandler = async () => {
  if (!(await $vProfileSettings.value.$validate())) return;

  try {
    await userStore.updateProfile({ ...profileSettings.value });

    fixedProfileSettings = {
      lastName: userStore.user!.lastName,
      firstName: userStore.user!.firstName,
      fatherName: userStore.user!.fatherName
    };

    isActiveSettingsButton.value = false;
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Данные профиля обновленны',
      life: 3000
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        const message = error.response?.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors: ResponseError[] = error?.response?.data?.errors as ResponseError[];

        errors?.forEach((error: ResponseError) => {
          $externalProfileSettingsResults.value[error.property] = error.message;
        });
      }
    }
  }
};

const validateWorkspaceTime = (_: Date, sibling: IUpdateWorkspace): boolean => {
  if (sibling.workdayStartTime && sibling.workdayEndTime) {
    return !compareDatesInTime(sibling.workdayStartTime, sibling.workdayEndTime);
  } else {
    return true;
  }
};

const workspaceSettingsRules = computed(() => ({
  workdayStartTime: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!workspaceSettings.value.workdayStartTime)
    ),
    date: helpers.withMessage(VALIDATION_ERROR.IS_TIME, isDate),
    isTimeMore: helpers.withMessage(
      'Начальное время должно быть меньше, чем конечное время.',
      validateWorkspaceTime
    )
  },
  workdayEndTime: {
    requiredIf: helpers.withMessage(
      VALIDATION_ERROR.IS_NOT_EMPTY,
      requiredIf(!!workspaceSettings.value.workdayEndTime)
    ),
    date: helpers.withMessage(VALIDATION_ERROR.IS_TIME, isDate),
    isTimeMore: helpers.withMessage(
      'Конечное время должно быть больше, чем начальное время.',
      validateWorkspaceTime
    )
  }
}));

let fixedWorkspaceSettings = {
  workdayStartTime: createDateWithTime(userStore.user!.settings!.workdayStartTime),
  workdayEndTime: createDateWithTime(userStore.user!.settings!.workdayEndTime)
};

const workspaceSettings = ref<IUpdateWorkspace>({
  workdayStartTime: fixedWorkspaceSettings.workdayStartTime,
  workdayEndTime: fixedWorkspaceSettings.workdayEndTime
});

const $externalWorkspaceSettingsResults = ref<ServerErrors>({
  workdayStartTime: '',
  workdayEndTime: ''
});

const resetExternalWorkspaceSettingsResultProperty = (propertyName: keyof IUpdateWorkspace) => {
  $externalProfileSettingsResults.value[propertyName] = '';
};

const $vWorkspaceSettings = useVuelidate<IUpdateWorkspace>(
  workspaceSettingsRules,
  workspaceSettings,
  { $externalResults: $externalWorkspaceSettingsResults }
);

const isActiveWorkspaceButton = ref<boolean>(false);

watch(
  workspaceSettings,
  (newValue: IUpdateWorkspace) => {
    isActiveWorkspaceButton.value =
      newValue.workdayStartTime &&
      newValue.workdayEndTime &&
      (!areDateEqualInTime(newValue.workdayStartTime, fixedWorkspaceSettings.workdayStartTime!) ||
        !areDateEqualInTime(newValue.workdayEndTime, fixedWorkspaceSettings.workdayEndTime!));
  },
  { deep: true }
);

const submitWorkspaceSettingsHandler = async () => {
  if (!(await $vWorkspaceSettings.value.$validate())) return;

  try {
    await userStore.updateWorkspace({ ...workspaceSettings.value });

    fixedWorkspaceSettings = {
      workdayStartTime: createDateWithTime(userStore.user!.settings.workdayStartTime)!,
      workdayEndTime: createDateWithTime(userStore.user!.settings.workdayEndTime)!
    };

    isActiveWorkspaceButton.value = false;
    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Параметры рабочей зоны обновленны',
      life: 3000
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        const message = error.response.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors = error.response?.data.errors as ResponseError[];

        errors?.forEach((error: ResponseError) => {
          $externalWorkspaceSettingsResults.value[error.property] = error.message;
        });
      }
    } else {
      console.error(error);
    }
  }
};
const isLoadingAvatarError = ref<boolean>(false);

const errorAvatarHandler = () => {
  isLoadingAvatarError.value = true;
}

const userAvatar = computed(() => {
  if (userStore.user?.avatar && !isLoadingAvatarError.value) {
    return getEnvVariable('VITE_APP_API_URL') + '/' + userStore.user.avatar;
  } else {
    return DEFAULT_CUSTOMER_IMAGE;
  }
});

const uploadAvatarHandler = async (event:  FileUploadUploaderEvent) => {
  try {
    const file = Array.isArray(event.files) ? event.files[0] : event.files;
    await userStore.uploadAvatar(file);

    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Изображение учетной записи обновлено',
      life: 3000
    });
    isLoadingAvatarError.value = false;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        const message = error.response.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors = error.response?.data.errors as ResponseError[];
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: errors[0].message, life: 3000 });
      }
    } else {
      console.error(error);
    }
  }
}

const removeAvatarHandler = async () => {
  try {
    await userStore.removeAvatar()

    toast.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Изображение учетной записи удалено',
      life: 3000
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        const message = error.response.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors = error.response?.data.errors as ResponseError[];
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: errors[0].message, life: 3000 });
      }
    } else {
      console.error(error);
    }
  }
}
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6">
      <Card class="relative">
        <h5>Аватар</h5>
        <div class="mb-5">Здесь настраивается изображение учетной записи</div>
        <div class="flex gap-4">
          <Avatar
            :image="userAvatar"
            class="flex-shrink-0"
            size="xlarge"
            shape="circle"
            :pt="{
              image: 'object-fit-cover'
            }"
            @error="errorAvatarHandler"
          />
          <div class="flex flex-column align-items-start gap-3">
            <div class="flex flex-column gap-2">
              <FileUpload
                mode="basic"
                name="avatar"
                accept="image/*"
                :max-file-size="2000000"
                choose-label="Загрузить"
                invalid-file-size-message="Размер файла превышает допустимый лимит (2 МБ)"
                invalid-file-type-message="Неподдерживаемый формат файла (JPEG, PNG)"
                aria-describedby="avatarHelp"
                custom-upload
                @uploader="uploadAvatarHandler"
              />
              <small id="avatarHelp" class="">Максимально допустимый размер файла — 2 MB.</small>
            </div>
            <Button
              @click="removeAvatarHandler"
              label="Удалить аватар"
              severity="danger"
              outlined
              :disabled="!userStore.user?.avatar || isLoadingAvatarError"
            />
          </div>
        </div>
      </Card>
      <Card>
        <h5>Профиль</h5>
        <div class="mb-5">Здесь настраивается учетная запись</div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="lastName">Фамилия</label>
            <InputText
              id="lastName"
              v-model.trim="profileSettings.lastName"
              aria-describedby="lastNameHelp"
              @blur="$vProfileSettings.lastName.$touch()"
              @update:modelValue="resetExternalProfileSettingsResultProperty('lastName')"
              :invalid="$vProfileSettings.lastName.$invalid && $vProfileSettings.lastName.$error"
            />
            <small
              id="lastNameHelp"
              class="p-invalid p-error"
              v-if="$vProfileSettings.lastName?.$errors[0]?.$message"
            >
              {{ $vProfileSettings.lastName?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="firstName">Имя</label>
            <InputText
              id="firstName"
              v-model.trim="profileSettings.firstName"
              aria-describedby="firstNameHelp"
              @blur="$vProfileSettings.firstName.$touch()"
              @update:modelValue="resetExternalProfileSettingsResultProperty('firstName')"
              :invalid="$vProfileSettings.firstName.$invalid && $vProfileSettings.firstName.$error"
            />
            <small
              v-if="$vProfileSettings.firstName?.$errors[0]?.$message"
              id="firstNameHelp"
              class="p-invalid p-error"
            >
              {{ $vProfileSettings.firstName?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="fatherName">Отчество</label>
            <InputText
              id="fatherName"
              v-model.trim="profileSettings.fatherName"
              aria-describedby="fatherNameHelp"
              @blur="$vProfileSettings.fatherName.$touch()"
              @update:modelValue="resetExternalProfileSettingsResultProperty('fatherName')"
              :invalid="
                $vProfileSettings.fatherName.$invalid && $vProfileSettings.fatherName.$error
              "
            />
            <small
              v-if="$vProfileSettings.fatherName?.$errors[0]?.$message"
              id="fatherNameHelp"
              class="p-invalid p-error"
            >
              {{ $vProfileSettings.fatherName?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="flex justify-content-end">
          <Button
            label="Сохранить"
            @click="submitProfileSettingsHandler"
            :disabled="!isActiveSettingsButton"
            :loading="userStore.isLoadingProfile"
          />
        </div>
      </Card>
    </div>
    <div class="col-12 lg:col-6">
      <Card>
        <h5>Безопасность</h5>
        <div class="mb-5">Здесь настраивается безопасность</div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="email">Электронный адрес</label>
            <IconField aria-label="email">
              <InputText
                id="email"
                :value="userStore.user.email"
                aria-describedby="emailHelp"
                disabled
                class="w-full"
              />
              <InputIcon class="pi pi-lock"> </InputIcon>
            </IconField>
          </div>
        </div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="oldPassword">Старый пароль</label>
            <Password
              id="oldPassword"
              class="w-full"
              inputClass="w-full"
              v-model="safetySettings.oldPassword"
              aria-describedby="oldPasswordHelp"
              :feedback="false"
              toggleMask
              @blur="$vSafetySettings.oldPassword.$touch()"
              @update:modelValue="resetExternalSafetySettingsResultProperty('oldPassword')"
              :invalid="
                $vSafetySettings.oldPassword.$invalid && $vSafetySettings.oldPassword.$error
              "
            />
            <small
              v-if="$vSafetySettings.oldPassword?.$errors[0]?.$message"
              id="oldPasswordHelp"
              class="p-invalid p-error"
            >
              {{ $vSafetySettings.oldPassword?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="newPassword">Новый пароль</label>
            <Password
              id="newPassword"
              class="w-full"
              inputClass="w-full"
              v-model="safetySettings.newPassword"
              @blur="$vSafetySettings.newPassword.$touch()"
              @update:modelValue="resetExternalSafetySettingsResultProperty('newPassword')"
              :invalid="
                $vSafetySettings.newPassword.$invalid && $vSafetySettings.newPassword.$error
              "
              aria-describedby="newPasswordHelp"
              :feedback="false"
              toggleMask
            />
            <small
              v-if="$vSafetySettings.newPassword?.$errors[0]?.$message"
              id="newPasswordHelp"
              class="p-invalid p-error"
            >
              {{ $vSafetySettings.newPassword?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="flex justify-content-end">
          <Button
            @click="submitSafetySettingsHandler"
            :disabled="
              ($vSafetySettings.oldPassword.$invalid && $vSafetySettings.oldPassword.$error) ||
              ($vSafetySettings.newPassword.$invalid && $vSafetySettings.newPassword.$error) ||
              !isActiveSafetyButton
            "
            label="Сохранить"
            :loading="userStore.isLoadingPassword"
          />
        </div>
      </Card>
      <Card>
        <h5>Рабочая зона</h5>
        <div class="mb-5">Здесь настраиваются параметры рабочей зоны</div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="timeStart">Начало рабочего дня</label>
            <Calendar
              id="workdayStartTime"
              v-model.trim="workspaceSettings.workdayStartTime"
              showIcon
              iconDisplay="input"
              timeOnly
              placeholder="10:00"
              @blur="$vWorkspaceSettings.workdayStartTime.$touch()"
              @update:modelValue="resetExternalWorkspaceSettingsResultProperty('workdayStartTime')"
              :invalid="
                $vWorkspaceSettings.workdayStartTime.$invalid &&
                $vWorkspaceSettings.workdayStartTime.$error
              "
            >
              <template #inputicon="{ clickCallback }">
                <InputIcon class="pi pi-clock cursor-pointer" @click="clickCallback" />
              </template>
            </Calendar>
            <small
              v-if="$vWorkspaceSettings.workdayStartTime?.$errors[0]?.$message"
              class="p-invalid p-error"
            >
              {{ $vWorkspaceSettings.workdayStartTime?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="field">
          <div class="flex flex-column gap-2">
            <label for="name">Окончание рабочего дня</label>
            <Calendar
              id="workdayEndTime"
              v-model.trim="workspaceSettings.workdayEndTime"
              showIcon
              iconDisplay="input"
              timeOnly
              placeholder="20:00"
              @blur="$vWorkspaceSettings.workdayEndTime.$touch()"
              @update:modelValue="resetExternalWorkspaceSettingsResultProperty('workdayEndTime')"
              :invalid="
                $vWorkspaceSettings.workdayEndTime.$invalid &&
                $vWorkspaceSettings.workdayEndTime.$error
              "
            >
              <template #inputicon="{ clickCallback }">
                <InputIcon class="pi pi-clock cursor-pointer" @click="clickCallback" />
              </template>
            </Calendar>
            <small
              v-if="$vWorkspaceSettings.workdayEndTime?.$errors[0]?.$message"
              class="p-invalid p-error"
            >
              {{ $vWorkspaceSettings.workdayEndTime?.$errors[0]?.$message }}
            </small>
          </div>
        </div>
        <div class="flex justify-content-end">
          <Button
            @click="submitWorkspaceSettingsHandler"
            label="Сохранить"
            :disabled="
              ($vWorkspaceSettings.workdayStartTime.$invalid &&
                $vWorkspaceSettings.workdayStartTime.$error) ||
              ($vWorkspaceSettings.workdayEndTime.$invalid &&
                $vWorkspaceSettings.workdayEndTime.$error) ||
              !isActiveWorkspaceButton
            "
            :loading="userStore.isLoadingWorkspace"
          />
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
