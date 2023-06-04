import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";



export function NewCycleForm(){

  const {activeCycle} = useContext(CyclesContext)
  const { register } = useFormContext()

  
  
  return(<FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id="task"
      list="task-suggestions"
      placeholder="Dê um nome para o seu projeto"
      {...register('task')}
      disabled={!!activeCycle}
    />

    <datalist id="task-suggestions">
      <option value="Projeto 1" />
      <option value="Projeto 2" />
      <option value="Projeto 1" />
      <option value="Projeto banana" />
    </datalist>

    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput
      type="number"
      disabled={!!activeCycle}
      id="minutesAmount"
      placeholder="00"
      step={5}
      min={5}
      max={60}
      {...register('minutesAmount', {valueAsNumber: true})}
    />

    <span>minutos.</span>
  </FormContainer>)
}